import { useState } from "react";
export default function ChildBlockSelector({ onAdd }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex items-center gap-2 mt-4">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="p-2 border rounded border-blue-600 text-sm"
      >
        <option value="" disabled>Agregar contenido</option>
        <option value="steps">Listado de pasos</option>
        <option value="list">Lista de items</option>
        <option value="link">Botón</option>
        <option value="map">Mapa</option>
      </select>
      <button
        disabled={!selected}
        onClick={() => { onAdd(selected); setSelected(""); }}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        Añadir
      </button>
    </div>
  );
}