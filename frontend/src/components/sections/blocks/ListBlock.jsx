import { useState, useEffect } from "react";
import List from "../List";
import { Subtitle } from "../../Typography";

export default function ListBlock({ block, isEditing, isAdmin, onChange }) {
  const [local, setLocal] = useState({
    title: block.data?.title || "",
    list: block.data?.list || []
  });
  const [localEditing, setLocalEditing] = useState(false);

  useEffect(() => {
    setLocal({
      title: block.data?.title || "",
      list: block.data?.list || []
    });
  }, [block.data]);

  const handleField = (e) => {
    const { name, value } = e.target;
    const updated = { ...local, [name]: value };
    setLocal(updated);
    onChange && onChange(block.id, updated);
  };

  const handleListChange = (idx, value) => {
    const newList = [...local.list];
    newList[idx] = { ...newList[idx], text: value };
    const updated = { ...local, list: newList };
    setLocal(updated);
    onChange && onChange(block.id, updated);
  };

  const addItem = () => {
    const newList = [...local.list, { id: Date.now(), text: "" }];
    const updated = { ...local, list: newList };
    setLocal(updated);
    onChange && onChange(block.id, updated);
  };

  const removeItem = async (idx) => {
    const newList = local.list.filter((_, i) => i !== idx);
    const updated = { ...local, list: newList };
    setLocal(updated);
    onChange && onChange(block.id, updated);
    // persist immediately if block exists on server
    if (block.id && !String(block.id).startsWith("new-")) {
      try {
        await ContentBlockService.updateBlock(block.id, updated);
      } catch (err) {
        console.error("Error borrando item de lista en DB:", err);
      }
    }
    window.location.reload();
  };

  return (
    <section key={block.id} className="relative">
      {isAdmin && isEditing && (
        <div className="absolute top-1 right-1 z-10">
          {!localEditing ? (
            <button onClick={() => setLocalEditing(true)} className="p-1 bg-blue-600 text-white rounded-full cursor-pointer">✏️</button>
          ) : (
            <button onClick={() => setLocalEditing(false)} className="p-1 bg-gray-500 text-white rounded-full cursor-pointer">✖</button>
          )}
        </div>
      )}
      {isAdmin && isEditing && localEditing && (
        <div className="mb-3 p-2 bg-white border rounded">
          <input
            name="title"
            value={local.title}
            onChange={handleField}
            placeholder="Título"
            className="w-full mb-2 p-1 border rounded"
          />
          <ul className="space-y-1">
            {local.list.map((item, idx) => (
              <li key={item.id} className="flex items-center gap-2">
                <input
                  value={item.text}
                  onChange={(e) => handleListChange(idx, e.target.value)}
                  className="flex-1 p-1 border rounded"
                />
                <button type="button" onClick={() => removeItem(idx)} className="text-red-500 cursor-pointer">&times;</button>
              </li>
            ))}
            <li>
              <button type="button" onClick={addItem} className="text-blue-600 underline cursor-pointer">Agregar ítem</button>
            </li>
          </ul>
        </div>
      )}
      <Subtitle>{local.title}</Subtitle>
      <ul className="list-disc space-y-2 mt-2">
        {local.list.map((listItem) => (
          <List item={listItem} key={listItem.id} />
        ))}
      </ul>
    </section>
  );
}

ListBlock.hasEditor = true;
