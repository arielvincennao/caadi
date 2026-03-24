import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ContentBlockService } from "../../api/services/ContentBlockService";
import { Text } from "../Typography";
import Button from "../common/Button";
import { StorageService } from "../../api/services/StorageService";
import { Icon } from "../common/Icon";

export default function BlogCard({ card: initialCard, className, blockId, onDelete, onUpdate, isEditable}) {
    const { isAuthenticated } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [card, setCard] = useState(initialCard);

    useEffect(() => {
        setCard(initialCard);
    }, [initialCard]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            // Validamos que exista un blockId y que NO sea un ID temporal, que todavía no existe en la
            const isTempId = String(blockId).startsWith("new-");

            if (blockId && !isTempId) {
                await ContentBlockService.updateBlock(blockId, card);
            }

            if (onUpdate) {
                onUpdate(card);
            }

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
        <div className={`flex flex-col w-full h-full border rounded-2xl border-gray-400 shadow-sm overflow-hidden relative`}>

            {isAuthenticated && isEditable && (
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md cursor-pointer px-2"
                                title="Editar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            {onDelete && (
                                <button onClick={() => onDelete(blockId)} className="bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 cursor-pointer transition" title="Eliminar Card">
                                    <Icon name={"eliminar"} className={"w-5 h-5 text-white"} />
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded-lg shadow-md font-bold text-xs cursor-pointer ">Guardar</button>
                            <button onClick={() => { setIsEditing(false); setCard(initialCard); }} className="bg-gray-500 text-white px-3 py-1 rounded-lg shadow-md font-bold text-xs cursor-pointer ">X</button>
                        </>
                    )}
                </div>
            )}

            <div className="relative">
                {card.image && (
                    <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                )}
                {isEditing && (
                    <div className={`${card.image ? 'absolute inset-0 bg-black/40' : 'h-48 bg-gray-100'} flex items-center justify-center p-4`}>
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

            {(hasDate || isEditing) && (
                <div className="self-start mb-2">
                    {isEditing ? (
                        <div className="bg-amber-100 p-2 rounded-r-xl border-l-4 border-amber-500 shadow-sm">
                            <label className="block text-[10px] font-bold text-amber-700 uppercase mb-1">
                                Fecha y Hora
                            </label>
                            <input
                                type="datetime-local"
                                name="date"
                                // El slice(0, 16) es para que el input datetime-local lo reconozca
                                value={card.date ? card.date.slice(0, 16) : ""}
                                onChange={handleChange}
                                className="text-sm bg-white border border-amber-400 rounded px-2 py-1 outline-none focus:ring-2 ring-amber-500"
                            />
                        </div>
                    ) : (
                        hasDate && (
                            <span className="inline-block px-3 py-1 text-base font-semibold text-black rounded-r-full shadow-sm bg-amber-300">
                                <Text>{formattedDate} · {formattedTime}</Text>
                            </span>
                        )
                    )}
                </div>
            )}

            <div className="flex flex-col p-6 flex-1 bg-white">
                {isEditing ? (
                    <input name="title" value={card.title || ""} onChange={handleChange} className="mb-3 text-2xl font-semibold border-b border-blue-400 outline-none focus:bg-blue-50" />
                ) : (
                    <h4 className="mb-3 text-2xl font-semibold leading-8">{card.title}</h4>
                )}

                {isEditing ? (
                    <textarea name="description" value={card.description || ""} onChange={handleChange} rows={3} className="mb-3 text-sm border p-2 rounded w-full outline-none focus:border-blue-400" />
                ) : (
                    <Text className="mb-3">{card.description}</Text>
                )}

                {(card.phone || isEditing) && (
                    <div className="mb-2">
                        {isEditing ? (
                            <div>
                                <label className="text-sm font-bold text-blue-600 uppercase">Telefono</label>

                                <input name="phone" value={card.phone || ""} onChange={handleChange} className="text-sm outline-none w-full p-2 border rounded border-blue-600" placeholder="Número de teléfono" />
                            </div>
                        ) : (
                            <Text>Tel: {card.phone}</Text>
                        )}
                    </div>
                )}

                {isEditing ? (
                    <div className="mt-auto pt-4">
                        <label className="text-sm font-bold text-blue-600 uppercase">URL ubicación</label>

                        <input name="ubication" value={card.ubication || ""} onChange={handleChange} className="w-full p-2 border rounded border-blue-600" placeholder="URL de Google Maps" />
                    </div>
                ) : (
                    <Button className="mt-auto" href={card.ubication} icon="ubicacion">Ver ubicación</Button>
                )}
            </div>
        </div>
    );
}