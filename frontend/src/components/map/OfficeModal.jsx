import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { OfficeService } from "../../api/services/OfficeService";
import Button from "../common/Button";

const OfficeModal = ({ office: initialOffice, onClose }) => {
  const modalRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [office, setOffice] = useState(initialOffice);

  useEffect(() => {
    setOffice(initialOffice);
  }, [initialOffice]);

  useEffect(() => {
    modalRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffice(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await OfficeService.update(office.id, {
        name: office.name,
        address: office.address,
        schedule: office.schedule,
        phone: office.phone,
        email: office.email,
        coordinates: office.coordinates
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error guardando oficina:", err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="office-title"
      tabIndex="-1"
      ref={modalRef}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-xl animate-fadeIn max-h-[90vh] overflow-y-auto"
      >
        {isAuthenticated && (
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Gestión de Oficina</span>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold hover:bg-blue-100 transition"
                >
                  ✏️ Editar
                </button>
              ) : (
                <>
                  <button onClick={handleSave} className="text-xs bg-green-600 text-white px-3 py-1 rounded-full font-bold">OK</button>
                  <button onClick={() => { setIsEditing(false); setOffice(initialOffice); }} className="text-xs bg-gray-400 text-white px-3 py-1 rounded-full font-bold">X</button>
                </>
              )}
            </div>
          </div>
        )}

        {isEditing ? (
          <div className="mb-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Nombre</label>
            <input
              name="name"
              value={office.name || ""}
              onChange={handleChange}
              className="w-full text-xl font-semibold border-b-2 border-blue-500 outline-none py-1"
            />
          </div>
        ) : (
          <h2 id="office-title" className="text-xl font-semibold mb-3">{office.name}</h2>
        )}

        <div className="space-y-3 text-gray-700 mb-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Dirección:</p>
            {isEditing ? (
              <input name="address" value={office.address || ""} onChange={handleChange} className="w-full border-b outline-none text-sm py-1" />
            ) : (
              <p className="text-sm">{office.address}</p>
            )}
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Horario:</p>
            {isEditing ? (
              <input name="schedule" value={office.schedule || ""} onChange={handleChange} className="w-full border-b outline-none text-sm py-1" />
            ) : (
              <p className="text-sm">{office.schedule || "No especificado"}</p>
            )}
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Teléfono:</p>
            {isEditing ? (
              <input name="phone" value={office.phone || ""} onChange={handleChange} className="w-full border-b outline-none text-sm py-1" />
            ) : (
              <p className="text-sm">{office.phone || "No especificado"}</p>
            )}
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Correo:</p>
            {isEditing ? (
              <input name="email" value={office.email || ""} onChange={handleChange} className="w-full border-b outline-none text-sm py-1" />
            ) : (
              <p className="text-sm">{office.email || "No especificado"}</p>
            )}
          </div>

          {isEditing && (
            <div className="bg-gray-50 p-2 rounded border border-dashed border-gray-300">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Coordenadas (Lat, Lng):</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Lat"
                  value={office.coordinates?.[0] || ""}
                  onChange={(e) => setOffice({ ...office, coordinates: [parseFloat(e.target.value), office.coordinates[1]] })}
                  className="w-1/2 p-1 text-xs border rounded"
                />
                <input
                  type="number"
                  placeholder="Lng"
                  value={office.coordinates?.[1] || ""}
                  onChange={(e) => setOffice({ ...office, coordinates: [office.coordinates[0], parseFloat(e.target.value)] })}
                  className="w-1/2 p-1 text-xs border rounded"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {!isEditing && office.phone && (
            <Button
              onClick={() => window.location.href = `tel:${office.phone.replace(/\s+/g, '')}`}
              className="w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Llamar
            </Button>
          )}

          {!isEditing && office.coordinates && (
            <Button
              href={`https://www.google.com/maps/dir/?api=1&destination=${office.coordinates[0]},${office.coordinates[1]}`}
              className="w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Cómo llegar
            </Button>
          )}

          <Button className="main-button-secondary" onClick={onClose}>
            {isEditing ? "Cerrar sin guardar" : "Cerrar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfficeModal;
