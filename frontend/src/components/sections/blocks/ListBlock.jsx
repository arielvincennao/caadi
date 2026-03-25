import { useState, useEffect } from "react";
import List from "../List";
import { Subtitle } from "../../Typography";
import { useLocalEditing } from "../../../hooks/useLocalEditing";
import { updateBlockData } from "../../../utils/blockHelpers";
import BtnControl from "../../common/BtnControl";
import { Icon } from "../../common/Icon";

export default function ListBlock({ block, isEditing, isAdmin, onChange }) {
  const { title, list } = block.data || {};
  const { localEditing, startEditing, stopEditing } = useLocalEditing();
  const [editingItemId, setEditingItemId] = useState(null);
  const [localTitle, setLocalTitle] = useState(block.title || "");
  const [localList, setLocalList] = useState(list || []);

  useEffect(() => {
    setLocalTitle(title || "");
    setLocalList(list || []);
  }, [title, list]);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  };

  const handleItemChange = (id, value) => {
    const updated = localList.map(item => item.id === id ? { ...item, text: value } : item);
    setLocalList(updated);
    updateBlockData(block, onChange, { list: updated });
  };

  const handleAddItem = () => {
    const newItem = { id: Date.now(), text: "" };
    const updated = [...(localList || []), newItem];
    setLocalList(updated);
    updateBlockData(block, onChange, { list: updated });

    setEditingItemId(newItem.id);
  };

  const handleDeleteItem = (id) => {
    const updated = localList.filter(item => item.id !== id);
    setLocalList(updated);
    updateBlockData(block, onChange, { list: updated });
  };

  return (
    <section key={block.id} className={`relative ${isAdmin && isEditing ? 'mt-6' : ''} mb-6`}>
      {isAdmin && isEditing && (
        <div className="absolute top-2 right-10 z-10">
          {!localEditing ? (
            <BtnControl onClick={startEditing} title={"Editar bloque"} className={"p-2 bg-blue-600 hover:bg-blue-700 text-white"}><Icon name={"editar"} className={"w-5 h-5"} /></BtnControl>

          ) : (
            <BtnControl onClick={stopEditing} title={"Dejar de editar bloque"} className={"p-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer"}><Icon name={"check"} className={"w-5 h-5"} /></BtnControl>

          )}
        </div>
      )}
      {isAdmin && isEditing && localEditing ? (
        <div>
          <label className="text-xs font-bold text-blue-600 uppercase">Titulo</label>
          <input
            className="text-3xl font-bold border-b-2 border-blue-500 bg-transparent outline-none w-full py-2"
            value={localTitle}
            onChange={handleTitleChange}
            onBlur={() => {
              if (localTitle !== title) {
                updateBlockData(block, onChange, { title: localTitle });
              }
            }}
            placeholder="Título"
          />
        </div>
      ) : (
        <Subtitle>{title}</Subtitle>
      )}

      <ul className="list-disc space-y-4 mt-2">
        {localList.map((item) => (
          <List
            key={item.id}
            item={item}
            isEditing={localEditing}
            isActiveEditing={editingItemId === item.id}
            isAdmin={isAdmin}
            onUpdate={(updatedItem) => handleItemChange(updatedItem.id, updatedItem.text)}
            onDelete={handleDeleteItem} />

        ))}
      </ul>
      {isAdmin && isEditing && (
        <button
          onClick={handleAddItem}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          + Añadir ítem
        </button>
      )}
    </section>
  );
}

ListBlock.hasEditor = true;
