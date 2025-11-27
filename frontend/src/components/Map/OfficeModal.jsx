import { useEffect, useRef } from "react";

const OfficeModal = ({ office, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="office-title"
      tabIndex="-1"
      ref={modalRef}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl animate-fadeIn"
      >
        <h2 id="office-title" className="text-xl font-semibold mb-3">{office.institution}</h2>

        <div className="space-y-1 text-gray-700">
            <p><strong>Dirección:</strong> {office.address}</p>
            <p><strong>Contacto:</strong> {office.contact}</p>
            <p><strong>Horario:</strong> {office.schedule}</p>
        </div>
        
        <button onClick={onClose} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default OfficeModal;