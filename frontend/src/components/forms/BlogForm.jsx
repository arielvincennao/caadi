import { useState } from "react";
import Button from "../common/Button";
import { StorageService } from "../../api/services/StorageService";

export default function BlogForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    date: initialData.date || "",
    ubication: initialData.ubication || "",
    phone: initialData.phone || "",
    image: initialData.image || ""
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.image;

    if (file) {
      imageUrl = await StorageService.uploadImage("blog", file);
    }

    onSubmit({
      ...form,
      image: imageUrl
    });
  };

  return (
    <>
      <h3 className="text-3xl font-bold text-center">Nuevo evento</h3>

      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <label className="text-sm font-bold text-blue-600 uppercase">Escriba un titulo</label>
        <input
          required
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-600"
        />
        <label className="text-sm font-bold text-blue-600 uppercase">Escriba una breve descripción</label>
        <textarea
          required
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-600"
        />
        <label className="text-sm font-bold text-blue-600 uppercase">Seleccione fecha y hora</label>

        <input
          required
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-600"
        />

        <input
          
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Teléfono (opcional)"
          className="w-full p-2 border rounded border-blue-600"
        />

        <label className="text-sm font-bold text-blue-600 uppercase">Escriba la URL destino</label>
        <input
          name="ubication"
          value={form.ubication}
          onChange={handleChange}
          required
          placeholder="ej https://caadi.vercel.app/"
          className="w-full p-2 border rounded border-blue-600"
        />
        <label className="text-sm font-bold text-blue-600 uppercase">Suba una imagen de portada representativa</label>

        <input
          name="image"
          type="file"
          accept="image/*"
          value={form.image}
          onChange={handleFileChange}
          className="w-full p-2 border rounded border-blue-600"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onCancel} className="px-2 py-2 rounded font-medium transition cursor-pointer bg-gray-200 hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="px-2 py-2 rounded font-medium transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700">Crear</button>
        </div>
      </form>
    </>

  );
}
