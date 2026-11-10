"use client";

// Usage: <Drawer open={open} onClose={() => setOpen(false)} title="Filters">...</Drawer>
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = "drawer-title";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      className="drawer-dialog fixed inset-x-0 bottom-0 m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto rounded-t-2xl border-0 bg-white p-0 text-neutral-900 shadow-raised backdrop:bg-neutral-900/50 sm:inset-y-0 sm:left-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:w-[min(26rem,90vw)] sm:rounded-l-2xl sm:rounded-tr-none"
    >
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-5 py-4">
        <h2 id={titleId} className="font-heading text-xl font-extrabold">{title}</h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close drawer"
          className="grid size-11 place-items-center rounded-lg text-neutral-700 hover:bg-neutral-100"
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </dialog>
  );
}
