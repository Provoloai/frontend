import { useState, useMemo } from "react";
import {
  Laptop,
  Tablet,
  Globe,
  Trash2,
  Clock,
  Info,
  Smartphone,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  deviceApi,
  useDeviceHistoryPage,
  DEVICE_HISTORY_PAGE_SIZE,
} from "@/api";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryClient";
import type { DeviceSession } from "@/types";

function formatSignInLocation(
  country?: string | null,
  state?: string | null
): string | null {
  const st = state?.trim();
  const co = country?.trim();
  if (!st && !co) return null;

  let countryLabel = co ?? "";
  if (co && co.length === 2 && /^[A-Za-z]{2}$/.test(co)) {
    try {
      countryLabel =
        new Intl.DisplayNames(["en"], { type: "region" }).of(
          co.toUpperCase()
        ) ?? co.toUpperCase();
    } catch {
      countryLabel = co.toUpperCase();
    }
  }

  if (st && countryLabel) return `${st}, ${countryLabel}`;
  return st || countryLabel || null;
}

export default function LoginHistory() {
  const [cursorStack, setCursorStack] = useState<(string | undefined)[]>([
    undefined,
  ]);
  const exclusiveAfter = cursorStack[cursorStack.length - 1];

  const { data: devicesResponse, isLoading, isFetching } =
    useDeviceHistoryPage(exclusiveAfter);

  const queryClient = useQueryClient();
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const page = devicesResponse?.data;
  const sessions = page?.sessions ?? [];

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

  const displaySessions = useMemo(() => {
    const list = [...sessions];
    list.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return list.map((s: DeviceSession, i) => ({
      ...s,
      isCurrent: cursorStack.length === 1 && i === 0,
    }));
  }, [sessions, cursorStack.length]);

  const canGoNext = Boolean(page?.nextCursor);
  const canGoPrev = cursorStack.length > 1;

  const goNext = () => {
    if (!page?.nextCursor) return;
    setCursorStack(prev => [...prev, page.nextCursor!]);
  };

  const goPrev = () => {
    setCursorStack(prev =>
      prev.length <= 1 ? prev : prev.slice(0, -1)
    );
  };

  const handleRevoke = async (id: string) => {
    if (revokingId) return;

    try {
      setRevokingId(id);
      setError(null);
      await deviceApi.revokeDevice(id);
      setCursorStack([undefined]);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.devices.all(),
      });
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
      return <Smartphone className="h-5 w-5" />;
    }
    if (d.includes("tablet") || d.includes("ipad")) {
      return <Tablet className="h-5 w-5" />;
    }
    return <Laptop className="h-5 w-5" />;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6 relative">
      {isFetching && !isLoading && (
        <div
          className="absolute inset-0 rounded-xl bg-white/50 z-10 pointer-events-none transition-opacity"
          aria-hidden
        />
      )}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            Login History
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Review devices that have accessed your account. Up to{" "}
            {DEVICE_HISTORY_PAGE_SIZE} sign-ins per page (newest first).
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {displaySessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <Info className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p>No login history on this page.</p>
          {canGoPrev && (
            <button
              type="button"
              onClick={goPrev}
              className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 underline"
            >
              Back to newer sign-ins
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {displaySessions.map(session => {
              const locationLine = formatSignInLocation(
                session.country,
                session.state
              );

              return (
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
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div
                      className={`p-2 rounded-full shrink-0 ${
                        session.isCurrent
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {getDeviceIcon(session.device, session.os)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 gap-y-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {cleanDeviceName(session.device) ||
                            session.os ||
                            "Unknown Device"}{" "}
                          •{" "}
                          {cleanBrowserName(session.browser) ||
                            "Unknown Browser"}
                        </p>
                        {session.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wide">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-2">
                        <span
                          className="flex items-center gap-1 shrink-0"
                          title={session.timestamp}
                        >
                          <Clock className="h-3 w-3" />
                          {formatDate(session.timestamp)}
                        </span>
                        <span className="hidden sm:inline shrink-0" aria-hidden>
                          •
                        </span>
                        <span className="flex items-center gap-1 min-w-0">
                          <Globe className="h-3 w-3 shrink-0" />
                          <span className="truncate">
                            {session.ip === "::1" ? "Localhost" : session.ip}
                          </span>
                        </span>
                      </div>

                      {locationLine ? (
                        <div
                          className={`mt-2.5 rounded-lg border px-3 py-2 ${
                            session.isCurrent
                              ? "border-indigo-100/80 bg-white/70"
                              : "border-gray-100 bg-slate-50/90"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                Country / region (sign-in)
                              </p>
                              <p className="text-sm mt-0.5 text-gray-900 font-medium">
                                {locationLine}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="shrink-0">
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
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {(canGoNext || canGoPrev) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Page {cursorStack.length}
            {sessions.length > 0
              ? ` · ${sessions.length} on this page`
              : ""}
            {` · max ${page?.limit ?? DEVICE_HISTORY_PAGE_SIZE} per page`}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!canGoPrev || revokingId !== null}
              onClick={goPrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-4 w-4" />
              Newer
            </button>
            <button
              type="button"
              disabled={!canGoNext || revokingId !== null}
              onClick={goNext}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
            >
              Older
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 flex gap-2 items-start">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-gray-400" />
        <p className="text-xs">
          For security, logging in on a new device will automatically log you
          out of other sessions. Removing an entry here deletes it from your
          history record. Sign-in location is approximate and comes from our
          hosting edge when your browser hits the app (not GPS).
        </p>
      </div>
    </div>
  );
}
