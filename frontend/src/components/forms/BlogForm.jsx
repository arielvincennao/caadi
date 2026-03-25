import { useState } from "react";
import { StorageService } from "../../api/services/StorageService";

export default function BlogForm({ initialData = {}, onSubmit, onCancel, variant }) {
  const [form, setForm] = useState({
    id: initialData.id || undefined,
    title: initialData.title || "",
    description: initialData.description || "",
    date: initialData.date || "",
    ubication: initialData.ubication || "",
    phone: initialData.phone || "",
    image: initialData.image || ""
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "El titulo es obligatorio";
    if (!form.description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!form.ubication.trim()) newErrors.ubication = "La ubicación es obligatoria";
    if (!file && !form.image) newErrors.image = "La imagén es obligatoria";
    if (variant === "event" && !form.date) newErrors.date = "La fecha y hora es obligatoria";

    return newErrors;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    let imageUrl = form.image;

    if (file) {
      imageUrl = await StorageService.uploadImage("blog", file);
    }

    onSubmit({
      ...form,
      image: imageUrl,
      variant
    });
  };

  return (
    <>
      <h3 className="text-3xl font-bold text-center">
        {variant === "event" ? "Nuevo evento" : "Nuevo centro"}</h3>

      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <label className="text-sm font-bold text-blue-600 uppercase">Escriba un titulo</label>
        {errors.title && <p className="text-red-500 text-sm font-bold uppercase">{errors.title}</p>}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={`w-full p-2 border rounded border-blue-600 ${errors.title ? "border-red-500" : ""
            }`}
        />
        <label className="text-sm font-bold text-blue-600 uppercase">Escriba una breve descripción</label>
        {errors.description && <p className="text-red-500 text-sm font-bold uppercase">{errors.description}</p>}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className={`w-full p-2 border rounded border-blue-600 ${errors.description ? "border-red-500" : ""
            }`}
        />
        {variant === "event" && (
          <>
            <label className="text-sm font-bold text-blue-600 uppercase">Seleccione fecha y hora</label>
            {errors.date && <p className="text-red-500 text-sm font-bold uppercase">{errors.date}</p>}

            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={`w-full p-2 border rounded border-blue-600 ${errors.date ? "border-red-500" : ""
                }`}
            />
          </>
        )}
        {variant === "center" && (
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Teléfono (opcional)"
            className={`w-full p-2 border rounded border-blue-600`}
          />
        )}
        <label className="text-sm font-bold text-blue-600 uppercase">Escriba la URL de la ubicación</label>
        {errors.ubication && <p className="text-red-500 text-sm font-bold uppercase">{errors.ubication}</p>}

        <input
          name="ubication"
          value={form.ubication}
          onChange={handleChange}
          placeholder="ej https://caadi.vercel.app/"
          className={`w-full p-2 border rounded border-blue-600 ${errors.ubication ? "border-red-500" : ""
            }`}
        />
        <label className="text-sm font-bold text-blue-600 uppercase">Suba una imagen de portada representativa</label>
        {errors.image && <p className="text-red-500 text-sm font-bold uppercase">{errors.image}</p>}

        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={`w-full p-2 border rounded border-blue-600 ${errors.image ? "border-red-500" : ""
            }`}
        />

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onCancel} className="px-2 py-2 rounded font-medium transition cursor-pointer bg-gray-200 hover:bg-gray-300">Cancelar</button>
          <button type="submit" className="px-2 py-2 rounded font-medium transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700">Crear</button>
        </div>
      </form>
    </>

  );
}
