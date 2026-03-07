import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Text } from "../Typography";
import { Icon } from "../common/Icon";

export default function CardSection({ card: initialCard, className, onClick, isActive }) {
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

  const handleSave = (e) => {
    if (e) e.stopPropagation();
    try {
      // TODO: await ContentBlockService.update(card.id, { data: card })
      setIsEditing(false);
    } catch (err) {
      console.error("Error guardando card:", err);
    }
  };

  const isLink = Boolean(card.href);
  const isExpanded = Boolean(onClick);
  const Wrapper = isEditing ? "div" : (isLink ? "a" : isExpanded ? "button" : "div");

  return (
    <Wrapper
      {...(isLink && !isEditing && { href: card.href, target: "_blank" })}
      {...(isExpanded && !isEditing && { type: "button", onClick })}
      style={isActive ? { borderColor: '#475569', backgroundColor: '#f1f5f9', borderWidth: '2px' } : {}}
      className={`flex flex-col items-center text-center max-w-sm p-6 border rounded-2xl bg-[#FCFCFC] border-gray-400 relative group ${!isEditing ? 'cursor-pointer' : ''} ${className ?? ''}`}
    >
      {isAuthenticated && (
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {!isEditing ? (
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              className="bg-blue-600 text-white p-1.5 rounded-full group-hover:opacity-100 transition-opacity shadow-sm"
              title="Editar Card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          ) : (
            <div className="flex gap-1">
              <button onClick={handleSave} className="bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm">OK</button>
              <button onClick={(e) => { e.stopPropagation(); setIsEditing(false); setCard(initialCard); }} className="bg-gray-500 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm">X</button>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col items-center mb-4">
        <Icon name={card.icon} className={`w-16 h-16 ${isEditing ? 'opacity-40' : ''}`} />
        {isEditing && (
          <input
            name="icon"
            value={card.icon || ""}
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
            className="mt-2 text-[10px] w-20 p-1 border rounded text-center bg-white outline-none focus:border-blue-400"
            placeholder="Icono"
          />
        )}
      </div>

      {isEditing ? (
        <input
          name="title"
          value={card.title || ""}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
          className="mb-3 text-2xl font-semibold leading-8 text-center border-b border-blue-400 bg-transparent w-full outline-none"
        />
      ) : (
        <h4 className="mb-3 text-2xl font-semibold leading-8">{card.title}</h4>
      )}

      {isEditing ? (
        <textarea
          name="description"
          value={card.description || ""}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
          rows={3}
          className="text-sm text-center border p-2 rounded w-full outline-none focus:border-blue-400 bg-white"
        />
      ) : (
        <Text>{card.description}</Text>
      )}

      {isEditing && card.href && (
        <div className="mt-4 w-full">
          <label className="text-[10px] font-bold text-gray-400 uppercase italic">Link destino:</label>
          <input
            name="href"
            value={card.href || ""}
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
            className="w-full text-[10px] border p-1 rounded font-mono"
            placeholder="https://..."
          />
        </div>
      )}
    </Wrapper>
  );
}
