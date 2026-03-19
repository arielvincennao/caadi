import { useState } from "react";
import Button from "../common/Button";
import { ICON_OPTIONS } from "../../utils/iconOptions.JS";

export default function LinkForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    href: initialData.href || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validación simple
    if (!form.name.trim() || !form.href.trim()) return;

    onSubmit && onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">

      <label className="text-sm font-bold text-blue-600 uppercase">Texto del botón</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded border-blue-600"
      />

      <label className="text-sm font-bold text-blue-600 uppercase">URL destino</label>
      <input
        name="href"
        value={form.href}
        onChange={handleChange}
        placeholder="ej https://caadi.vercel.app/"
        className="w-full p-2 border rounded border-blue-600"
      />

      
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onCancel} className="px-2 py-2 rounded font-medium transition cursor-pointer bg-gray-200 hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="px-2 py-2 rounded font-medium transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700">Crear</button>
      </div>
    </form>
  );
}