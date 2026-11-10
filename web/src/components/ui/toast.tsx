// Usage: <Toast title="Saved" message="Your list is ready." onDismiss={closeToast} />
import { X } from "lucide-react";

interface ToastProps {
  title: string;
  message: string;
  onDismiss?: () => void;
  variant?: "status" | "alert";
}

export function Toast({ title, message, onDismiss, variant = "status" }: ToastProps) {
  return (
    <div
      role={variant === "alert" ? "alert" : "status"}
      aria-live={variant === "alert" ? "assertive" : "polite"}
      className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-raised"
    >
      <div className="min-w-0 flex-1">
        <p className="font-bold text-neutral-900">{title}</p>
        <p className="mt-1 text-sm text-neutral-700">{message}</p>
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="grid size-11 shrink-0 place-items-center rounded-lg text-neutral-700 hover:bg-neutral-100"
        >
          <X aria-hidden="true" size={18} />
        </button>
      ) : null}
    </div>
  );
}
