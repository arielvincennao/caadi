import { useState, useEffect } from "react";
import Button from "../../common/Button";
import { updateBlockData } from "../../../utils/blockHelpers";

export default function LinkBlock({ block, isEditing, isAdmin, onChange }) {
  const [data, setData] = useState(block.data || {});
  const [localEditing, setLocalEditing] = useState(false);


  useEffect(() => {
    setData(block.data || {});
  }, [block.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...data, [name]: value };
    setData(updated);
    updateBlockData(block, onChange, { [name]: value });
  };

  

  return (
    <div className="relative">
      {isAdmin && isEditing && (
        <div className="absolute top-1 right-2 z-10">
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
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            placeholder="Texto"
            className="w-full mb-1 p-1 border rounded"
          />
          <input
            name="href"
            value={data.href || ""}
            onChange={handleChange}
            placeholder="URL destino"
            className="w-full mb-1 p-1 border rounded"
          />
          <input
            name="icon"
            value={data.icon || ""}
            onChange={handleChange}
            placeholder="Icono"
            className="w-full p-1 border rounded"
          />
        </div>
      )}

      <Button className="main-button mb-5" href={data.href} key={block.id} icon={data.icon}>
        {data.name}
      </Button>
    </div>
  );
}

LinkBlock.hasEditor = true;
