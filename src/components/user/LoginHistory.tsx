import { useState } from "react";
import {
  Laptop,
  Phone,
  Tablet,
  Globe,
  Trash2,
  Shield,
  Clock,
  Info,
} from "lucide-react";
import { deviceApi, useGetDevices } from "@/api";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";

export default function LoginHistory() {
  const { data: devicesResponse, isLoading, refetch } = useGetDevices();
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cleanDeviceName = (deviceName: string) => {
    if (!deviceName) return "";
    return deviceName
      .replace(
        /^((?:\d{1,3}\.){3}\d{1,3}|(?:[a-fA-F0-9]{1,4}:){1,7}:?|::1)\s*[-:]?\s*/,
        ""
      )
      .trim();
  };

  const cleanBrowserName = (browserName: string) => {
    if (!browserName) return "";
    return browserName
      .replace(
        /^(::1|::ffff:\d+\.\d+\.\d+\.\d+|(?:\d{1,3}\.){3}\d{1,3}|(?:[0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4})\s*[-:,|]?\s*/,
        ""
      )
      .replace(/\s+\d+(\.\d+)*$/, "")
      .trim();
  };

  const devices = devicesResponse?.data || [];

  // Sort devices: most recent first (by timestamp)
  // The first item (most recent) is likely the current session
  const sortedDevices = [...devices].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const handleRevoke = async (id: string) => {
    if (revokingId) return;

    try {
      setRevokingId(id);
      setError(null);
      await deviceApi.revokeDevice(id);
      await refetch();
    } catch (err) {
      setError("Failed to revoke session. Please try again.");
      console.error(err);
    } finally {
      setRevokingId(null);
    }
  };

  const getDeviceIcon = (device: string, os: string) => {
    const d = (device || "").toLowerCase();
    const o = (os || "").toLowerCase();

    if (
      d.includes("mobile") ||
      d.includes("phone") ||
      o.includes("ios") ||
      o.includes("android")
    ) {
      return <Phone className="h-5 w-5" />;
    }
    if (d.includes("tablet") || d.includes("ipad")) {
      return <Tablet className="h-5 w-5" />;
    }
    return <Laptop className="h-5 w-5" />;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if valid date
      if (isNaN(date.getTime())) return "Unknown time";

      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.round(diffMs / 60000);
      const diffHours = Math.round(diffMs / 3600000);
      const diffDays = Math.round(diffMs / 86400000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24)
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    } catch {
      return "Unknown time";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // If strict single session is enforced, we might only see 1 device most of the time,
  // but if the backend returns history, we show it.

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            Login History
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Review devices that have accessed your account.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {sortedDevices.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <Info className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p>No login history available.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {sortedDevices.map(session => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  session.isCurrent
                    ? "bg-indigo-50 border-indigo-100 ring-1 ring-indigo-500/10"
                    : "bg-white border-gray-100 hover:bg-gray-50"
                } transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      session.isCurrent
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {getDeviceIcon(session.device, session.os)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 text-sm">
                        {cleanDeviceName(session.device) ||
                          session.os ||
                          "Unknown Device"}{" "}
                        •{" "}
                        {cleanBrowserName(session.browser) || "Unknown Browser"}
                      </p>
                      {session.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wide">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span
                        className="flex items-center gap-1"
                        title={session.timestamp}
                      >
                        <Clock className="h-3 w-3" />
                        {formatDate(session.timestamp)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {session.ip === "::1" ? "Localhost" : session.ip}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <CustomButton
                    onClick={() => handleRevoke(session.id)}
                    isLoading={revokingId === session.id}
                    loadingText=""
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 bg-transparent border-none shadow-none h-auto w-auto min-h-0 min-w-0"
                    title="Remove from history"
                  >
                    <Trash2 className="h-4 w-4" />
                  </CustomButton>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 flex gap-2 items-start">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-gray-400" />
        <p>
          For security, logging in on a new device will automatically log you
          out of other sessions. Removing an entry here deletes it from your
          history record.
        </p>
      </div>
    </div>
  );
}
