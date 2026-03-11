import { useState, useCallback, type ReactNode } from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import {
  ToastContext,
  type ToastItem,
  type ToastContextValue,
} from "./useToast";

/* ------------------------------------------------------------------ */
/*  Variant styles                                                     */
/* ------------------------------------------------------------------ */

const variantConfig: Record<
  ToastItem["variant"],
  {
    icon: ReactNode;
    bg: string;
    border: string;
    text: string;
    iconColor: string;
  }
> = {
  success: {
    icon: <CheckCircle2 size={20} />,
    bg: "bg-[#ECFDF3]",
    border: "border-[#ABEFC6]",
    text: "text-[#064E3B]",
    iconColor: "text-[#064E3B]",
  },
  error: {
    icon: <AlertCircle size={20} />,
    bg: "bg-[#FEF2F2]",
    border: "border-[#FECACA]",
    text: "text-[#991B1B]",
    iconColor: "text-[#991B1B]",
  },
  warning: {
    icon: <AlertTriangle size={20} />,
    bg: "bg-[#FFFBEB]",
    border: "border-[#FDE68A]",
    text: "text-[#92400E]",
    iconColor: "text-[#92400E]",
  },
  info: {
    icon: <Info size={20} />,
    bg: "bg-[#EFF6FF]",
    border: "border-[#BFDBFE]",
    text: "text-[#1E40AF]",
    iconColor: "text-[#1E40AF]",
  },
};

/* ------------------------------------------------------------------ */
/*  Keyframe style (injected once)                                     */
/* ------------------------------------------------------------------ */

const KEYFRAME_STYLE = `
@keyframes toast-slide-in {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
}
`;

let styleInjected = false;
function injectKeyframes() {
  if (styleInjected) return;
  const style = document.createElement("style");
  style.textContent = KEYFRAME_STYLE;
  document.head.appendChild(style);
  styleInjected = true;
}

/* ------------------------------------------------------------------ */
/*  Single toast                                                       */
/* ------------------------------------------------------------------ */

function ToastCard({
  toast: t,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const config = variantConfig[t.variant];

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${config.bg} ${config.border}`}
      role="alert"
      style={{ animation: "toast-slide-in 0.3s ease-out" }}
    >
      <span className={`shrink-0 ${config.iconColor}`}>{config.icon}</span>

      <p className={`flex-1 text-sm font-medium ${config.text}`}>{t.message}</p>

      <button
        onClick={() => onDismiss(t.id)}
        className={`shrink-0 cursor-pointer rounded-md p-1 transition-colors hover:bg-black/5 ${config.text}`}
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

const TOAST_DURATION = 5000;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // inject keyframes on first mount
  useState(() => injectKeyframes());

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast: ToastContextValue["toast"] = useCallback(
    (message, variant = "success") => {
      const id = crypto.randomUUID();
      setToasts(prev => [...prev, { id, message, variant }]);

      setTimeout(() => {
        dismiss(id);
      }, TOAST_DURATION);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container — bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <ToastCard toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
