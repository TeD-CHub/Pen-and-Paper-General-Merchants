"use client";

// Usage: <Modal open={open} onClose={() => setOpen(false)} title="Confirm order">...</Modal>
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = "modal-title";

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
      className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border-0 bg-white p-0 text-neutral-900 shadow-raised backdrop:bg-neutral-900/50"
    >
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-5 py-4">
        <h2 id={titleId} className="font-heading text-xl font-extrabold">{title}</h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close dialog"
          className="grid size-11 place-items-center rounded-lg text-neutral-700 hover:bg-neutral-100"
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </dialog>
  );
}
