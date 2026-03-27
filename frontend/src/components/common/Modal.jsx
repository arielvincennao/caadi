import { useEffect } from "react";

export default function Modal({ open, onClose, children }) {
  // cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* contenido */}
      <div className="relative bg-white rounded-xl shadow-lg p-5 w-full max-w-md z-10 m-2">
        {children}
      </div>
    </div>
  );
}