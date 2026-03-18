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

      {/* Texto */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Texto del botón"
        className="w-full p-2 border rounded"
      />

      {/* URL */}
      <input
        name="href"
        value={form.href}
        onChange={handleChange}
        placeholder="URL destino"
        className="w-full p-2 border rounded"
      />

      {/* Botones */}
      <div className="flex justify-end gap-2 pt-2">
        <Button onClick={onCancel} className="bg-gray-400 px-4 py-2">
          Cancelar
        </Button>

        <Button type="submit" className="bg-blue-600 px-4 py-2">
          Crear
        </Button>
      </div>
    </form>
  );
}