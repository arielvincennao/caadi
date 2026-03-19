import { useState } from "react";
export default function TitleForm({ label = "Título", onSubmit, onCancel }) {
  const [title, setTitle] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({ title });
      }}
      className="p-4 space-y-3"
    >
      <label className="text-sm font-bold text-blue-600 uppercase">Escriba un titulo para su listado</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded border-blue-600"
      />

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-2 py-1 rounded font-medium transition cursor-pointer bg-gray-200 hover:bg-gray-300">Cancelar</button>
        <button type="submit" className="px-2 py-1 rounded font-medium transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
          Crear
        </button>
      </div>
    </form>
  );
}