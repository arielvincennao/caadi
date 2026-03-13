import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ContentBlockService } from "../../api/services/ContentBlockService";
import { Text } from "../Typography";
import Button from "../common/Button";
import { StorageService } from "../../api/services/StorageService";

export default function BlogCard({ card: initialCard, className, blockId }) {
  const { isAuthenticated } = useAuth();
  const [localEditing, setLocalEditing] = useState(false);
  const [card, setCard] = useState(initialCard);

  useEffect(() => {
    setCard(initialCard);
  }, [initialCard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard(prev => ({ ...prev, [name]: value }));
  };

  // determine whether the inline editor should be shown
  const showEditor = isAdmin && sectionEditing && localEditing;

  const handleSave = async () => {
    try {
      await ContentBlockService.updateBlock(blockId, card);
      setIsEditing(false);
    } catch (err) {
      console.error("Error guardando card:", err);
    }
  };

  const hasDate = Boolean(card.date);
  let formattedDate;
  let formattedTime;

  if (hasDate) {
    const dateObj = new Date(card.date);
    formattedDate = dateObj.toLocaleDateString("es-AR", { day: "numeric", month: "long" });
    formattedTime = dateObj.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className={`flex flex-col w-full h-full border rounded-2xl border-gray-400 shadow-sm overflow-hidden relative ${localEditing ? "ring-2 ring-blue-500 shadow-lg" : ""} ${className}` }>

      {isAuthenticated && isAdmin && sectionEditing && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {!localEditing ? (
            <button onClick={() => setLocalEditing(true)} className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer" title="Editar Card">
              ✏️
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded-lg shadow-md font-bold text-xs cursor-pointer">Guardar</button>
              <button onClick={() => { setLocalEditing(false); setCard(initialCard); }} className="bg-gray-500 text-white px-3 py-1 rounded-lg shadow-md font-bold text-xs cursor-pointer">X</button>
              {onDelete && (
                <button onClick={() => onDelete(card.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-md font-bold text-xs cursor-pointer">Eliminar</button>
              )}
            </>
          )}
        </div>
      )}

      <div className="relative">
        <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
        {localEditing && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                try {
                  const folder = card.ubication?.includes('cultura') ? 'cultura_card_covers' : 'centrodia_card_covers';
                  const url = await StorageService.uploadImage(folder, file);
                  setCard(prev => ({ ...prev, image: url }));
                } catch (err) {
                  console.error("Error subiendo imagen:", err);
                }
              }}
              className="w-full p-2 text-xs rounded border border-white bg-white/90 outline-none"
            />
          </div>
        )}
      </div>

      {hasDate && (
        <span className="inline-block px-3 py-1 text-base font-semibold text-black rounded-r-full shadow-sm bg-amber-300 self-start">
          <Text>{formattedDate} · {formattedTime}</Text>
        </span>
      )}

      <div className="flex flex-col p-6 flex-1 bg-white">
        {showEditor ? (
          <input name="title" value={card.title || ""} onChange={handleChange} className="mb-3 text-2xl font-semibold border-b border-blue-400 outline-none focus:bg-blue-50" />
        ) : (
          <h4 className="mb-3 text-2xl font-semibold leading-8">{card.title}</h4>
        )}

        {showEditor ? (
          <textarea name="description" value={card.description || ""} onChange={handleChange} rows={3} className="mb-3 text-sm border p-2 rounded w-full outline-none focus:border-blue-400" />
        ) : (
          <Text className="mb-3">{card.description}</Text>
        )}

        {(card.phone || showEditor) && (
          <div className="mb-2">
            {showEditor ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Tel:</span>
                <input name="phone" value={card.phone || ""} onChange={handleChange} className="text-sm border-b w-full outline-none" placeholder="Número de teléfono" />
              </div>
            ) : (
              <Text>Tel: {card.phone}</Text>
            )}
          </div>
        )}

        {showEditor ? (
          <div className="mt-auto pt-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Link Ubicación:</label>
            <input name="ubication" value={card.ubication || ""} onChange={handleChange} className="w-full text-xs border p-1 rounded" placeholder="URL de Google Maps" />
          </div>
        ) : (
          <Button className="mt-auto" href={card.ubication} icon="ubicacion">Ver ubicación</Button>
        )}
      </div>
    </div>
  );
}

BlogCard.hasEditor = true;