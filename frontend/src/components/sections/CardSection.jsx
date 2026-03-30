import { useState, useEffect } from "react";
import { Text } from "../Typography";
import { Icon } from "../common/Icon";
import { ICON_OPTIONS } from "../../utils/iconOptions.JS";

export default function CardSection({ card: initialCard, className, onClick, isActive, isEditing: propEditing, isAdmin, onUpdate, onDelete }) {
    const [localEditing, setLocalEditing] = useState(false);
    const [card, setCard] = useState(initialCard || {});

    useEffect(() => {
        setCard(initialCard || {});
    }, [initialCard]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.stopPropagation();
        if (onUpdate) onUpdate(card);
        setLocalEditing(false);
    };

    const isLink = Boolean(card.href);
    const isExpanded = Boolean(onClick);
    const activeEditing = localEditing;
    const Wrapper = activeEditing ? "div" : (isLink ? "a" : "div");

    
    return (
        <>
            <div>
                <Wrapper
                    {...(isLink && !activeEditing && { href: card.href, target: "_blank" })}
                    {...(isExpanded && !activeEditing && { role: "button", tabIndex: 0, onClick, "aria-expanded": isActive, "aria-controls": `card-content-${card.id}` })}
                    style={isActive ? { borderColor: '#475569', backgroundColor: '#f1f5f9', borderWidth: '2px' } : {}}
                    className={`flex flex-col items-center text-center max-w-sm p-6 border rounded-2xl bg-[#FCFCFC] border-gray-400 relative group ${!activeEditing ? 'cursor-pointer' : ''} ${className ?? ''}`}
                >
                    {isAdmin && (
                        <div className="absolute top-2 right-2 z-10 flex gap-1 min-w-[60px] justify-end">
                            {!propEditing && !localEditing ? (
                                <div>
                                    <button
                                        type="button"
                                        tabIndex={0}
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLocalEditing(true); }}
                                        className="bg-blue-600 text-white p-2 rounded-full opacity-100 transition-opacity shadow-sm cursor-pointer me-1"
                                        title="Editar Card"
                                    >
                                        <Icon name={"editar"} className={"w-5 h-5"} />
                                    </button>
                                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(card.id); }}
                                        className="bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 cursor-pointer transition" title="Eliminar Card">
                                        <Icon name={"eliminar"} className={"w-5 h-5 text-white"} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-1">
                                    <button tabIndex={0} onClick={handleSave} className="bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm cursor-pointer">OK</button>
                                    <button tabIndex={0} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLocalEditing(false); setCard(initialCard); }} className="bg-gray-500 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm cursor-pointer">X</button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col items-center mb-4">
                        <Icon name={card.icon} className={`w-16 h-16 ${activeEditing ? 'opacity-40' : ''}`} />
                        {activeEditing && (
                            <>
                                <label className="text-sm font-bold text-blue-600 uppercase">Seleccione un icono</label>
                                <div className="flex gap-2 flex-wrap">
                                    {ICON_OPTIONS.map((ico) => (
                                        <button
                                            key={ico}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setCard(prev => ({ ...prev, icon: ico }));
                                            }}
                                            className={`p-2 border rounded ${card.icon === ico ? 'bg-blue-200' : ''}`}
                                        >
                                            <Icon name={ico} className="w-6 h-6" />
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {activeEditing ? (
                        <input
                            name="title"
                            value={card.title || ""}
                            onChange={handleChange}
                            onClick={(e) => e.stopPropagation()}
                            className="mb-3 text-2xl font-semibold leading-8 text-center border-b border-blue-400 bg-transparent w-full outline-none"
                        />
                    ) : (
                        <h4 id={`card-title-${card.id}`} className="mb-3 text-2xl font-semibold leading-8">{card.title}</h4>
                    )}

                    {activeEditing ? (
                        <textarea
                            name="description"
                            value={card.description || ""}
                            onChange={handleChange}
                            onClick={(e) => e.stopPropagation()}
                            rows={3}
                            className="text-sm text-center border p-2 rounded w-full outline-none border-blue-600 bg-white"
                        />
                    ) : (
                        <Text>{card.description}</Text>
                    )}

                    {(propEditing || localEditing) && card.href && (
                        <div className="mt-4 w-full">
                            <label className="text-[10px] font-bold text-gray-400 uppercase italic">Link destino:</label>
                            <input
                                name="href"
                                value={card.href || ""}
                                onChange={handleChange}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full text-[10px] border p-1 rounded font-mono border-blue-600"
                                placeholder="https://..."
                            />
                        </div>
                    )}
                </Wrapper>
            </div>
        </>
    );
}