import { useState, useEffect } from "react";
import { supabase } from "../../../db/supabaseClient";
import { Text } from "../Typography";
import Button from "../common/Button";

export default function BlogCard({ card: initialCard, className }) {
  // 1. Estados para Admin y Edición
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [card, setCard] = useState(initialCard);

  // 2. Validar sesión de admin al cargar
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setIsAdmin(true);
      } catch (error) {
        console.error("Error validando sesión:", error);
      }
    };
    checkUser();
  }, []);

  // Sincronizar si la prop initialCard cambia
  useEffect(() => {
    setCard(initialCard);
  }, [initialCard]);

  // 3. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Guardando cambios de la card...", card);
    // await supabase.from('tu_tabla').update(card).eq('id', card.id);
    setIsEditing(false);
  };

  // 4. Lógica de Fechas (Original)
  const hasDate = Boolean(card.date);
  let formattedDate;
  let formattedTime;

  if (hasDate) {
    const dateObj = new Date(card.date);
    formattedDate = dateObj.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long"
    });
    formattedTime = dateObj.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return (
    <div
      className={`
        flex flex-col 
        w-full h-full
        border rounded-2xl 
        border-gray-400 
        shadow-sm
        overflow-hidden
        relative
        ${isEditing ? "ring-2 ring-blue-500 shadow-lg" : ""}
        ${className}
      `}
    >
      {/* BOTONES DE CONTROL ADMIN */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
              title="Editar Card"
            >
              ✏️
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1 rounded-lg shadow-md font-bold text-xs"
              >
                Guardar
              </button>
              <button
                onClick={() => { setIsEditing(false); setCard(initialCard); }}
                className="bg-gray-500 text-white px-3 py-1 rounded-lg shadow-md font-bold text-xs"
              >
                X
              </button>
            </>
          )}
        </div>
      )}

      {/* IMAGEN / INPUT URL IMAGEN */}
      <div className="relative">
        <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
        {isEditing && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
            <input
              name="image"
              value={card.image || ""}
              onChange={handleChange}
              placeholder="URL de la imagen"
              className="w-full p-2 text-xs rounded border border-white bg-white/90 outline-none"
            />
          </div>
        )}
      </div>

      {hasDate && (
        <span className="inline-block px-3 py-1 text-base font-semibold text-black rounded-r-full shadow-sm bg-amber-300 self-start">
          <Text>
            {formattedDate} · {formattedTime}
          </Text>
        </span>
      )}

      <div className="flex flex-col p-6 flex-1 bg-white">
        {/* TÍTULO EDITABLE */}
        {isEditing ? (
          <input
            name="title"
            value={card.title || ""}
            onChange={handleChange}
            className="mb-3 text-2xl font-semibold border-b border-blue-400 outline-none focus:bg-blue-50"
          />
        ) : (
          <h4 className="mb-3 text-2xl font-semibold leading-8">{card.title}</h4>
        )}

        {/* DESCRIPCIÓN EDITABLE */}
        {isEditing ? (
          <textarea
            name="description"
            value={card.description || ""}
            onChange={handleChange}
            rows={3}
            className="mb-3 text-sm border p-2 rounded w-full outline-none focus:border-blue-400"
          />
        ) : (
          <Text className="mb-3"> {card.description}</Text>
        )}

        {/* TELÉFONO EDITABLE */}
        {(card.phone || isEditing) && (
          <div className="mb-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Tel:</span>
                <input
                  name="phone"
                  value={card.phone || ""}
                  onChange={handleChange}
                  className="text-sm border-b w-full outline-none"
                  placeholder="Número de teléfono"
                />
              </div>
            ) : (
              <Text>Tel: {card.phone}</Text>
            )}
          </div>
        )}

        {/* UBICACIÓN / BOTÓN */}
        {isEditing ? (
          <div className="mt-auto pt-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Link Ubicación:</label>
            <input
              name="ubication"
              value={card.ubication || ""}
              onChange={handleChange}
              className="w-full text-xs border p-1 rounded"
              placeholder="URL de Google Maps"
            />
          </div>
        ) : (
          <Button className={"mt-auto"} href={card.ubication} icon={"ubicacion"}>
            Ver ubicación
          </Button>
        )}
      </div>
    </div>
  );
}