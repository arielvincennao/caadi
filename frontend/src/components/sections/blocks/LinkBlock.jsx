import { useState, useEffect } from "react";
import Button from "../../common/Button";
import { updateBlockData } from "../../../utils/blockHelpers";
import BtnControl from "../../common/BtnControl";
import { Icon } from "../../common/Icon";

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
        <div className="absolute top-6 -right-2 z-10">
          {!localEditing ? (
            <BtnControl onClick={() => setLocalEditing(true)} title={"Editar bloque"} className={"p-2 bg-blue-600 hover:bg-blue-700 text-white"}><Icon name={"editar"} className={"w-5 h-5"} /></BtnControl>
          ) : (
            <BtnControl onClick={() => setLocalEditing(false)} title={"Dejar de editar bloque"} className={"p-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer"}><Icon name={"check"} className={"w-5 h-5"} /></BtnControl>
          )}
        </div>
      )}
      {isAdmin && isEditing && localEditing && (
        <div className="mt-12 mb-3 p-2 border rounded border-gray-400">
          <label className="text-sm font-bold text-blue-600 uppercase">Editar texto</label>
          <input
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded border-blue-600"
          />
          <label className="text-sm font-bold text-blue-600 uppercase">Editar URL</label>
          <input
            name="href"
            value={data.href || ""}
            onChange={handleChange}
            placeholder="URL destino"
            className="w-full p-2 border rounded border-blue-600"
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
