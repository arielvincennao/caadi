import { useEffect, useRef } from "react";

const OfficeModal = ({ office, onClose }) => {
    const modalRef = useRef(null);

    // Control de teclado y foco
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

    // Renderizado
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
                className="relative bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl animate-fadeIn"
            >
                <h2 id="office-title" className="text-xl font-semibold mb-3">{office.institution}</h2>

                <div className="space-y-1 text-gray-700 mb-6">
                    <p><strong>Dirección:</strong> {office.address}</p>
                    {office.hours && <p><strong>Horario:</strong> {office.hours}</p>}
                    {office.phone && <p><strong>Teléfono:</strong> {office.phone}</p>}
                    {office.email && <p><strong>Correo:</strong> {office.email}</p>}
                </div>

                <div className="flex flex-col gap-3">
                    {/* Botón de Llamar */}
                    {office.phone && (
                        <a
                            href={`tel:${office.phone.replace(/\s+/g, '')}`}
                            className="w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            Llamar
                        </a>
                    )}

                    {/* Botón de Cómo llegar */}
                    {office.coordinates && (
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${office.coordinates[0]},${office.coordinates[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Cómo llegar
                        </a>
                    )}

                    {/* Botón de Cerrar */}
                    <button
                        onClick={onClose}
                        className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition font-medium cursor-pointer mt-1"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfficeModal;