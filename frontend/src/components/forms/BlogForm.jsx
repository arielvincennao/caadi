import { useState } from "react";
import Button from "../common/Button";

export default function BlogForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    date: initialData.date || "",
    ubication: initialData.ubication || "",
    phone: initialData.phone || "",
    image: initialData.image || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    onSubmit && onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Título"
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full p-2 border rounded"
      />

      <input
        type="datetime-local"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Teléfono (opcional)"
        className="w-full p-2 border rounded"
      />

      <input
        name="ubication"
        value={form.ubication}
        onChange={handleChange}
        placeholder="URL ubicación"
        className="w-full p-2 border rounded"
      />

      <input
        name="image"
        type="file"
        value={form.image}
        onChange={handleChange}
        placeholder="URL imagen (temporal)"
        className="w-full p-2 border rounded"
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button onClick={onCancel} className="bg-gray-400 px-4 py-2">
          Cancelar
        </Button>

        <button type="submit" className="bg-blue-600 px-4 py-2 text-white rounded">
          Guardar
        </button>
      </div>
    </form>
  );
}