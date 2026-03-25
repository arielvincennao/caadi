import { useState } from "react";
export default function TitleForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "El titulo es obligatorio";

    return newErrors;

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit({ title });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.title;

      return newErrors;
    });
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-3"
    >
      <label className="text-sm font-bold text-blue-600 uppercase">Escriba un titulo para su listado</label>
      {errors && (
        <p className="text-sm font-bold text-red-600 uppercase">{errors.title}</p>
      )}
      <input
        value={title}
        onChange={handleChange}
        className={`w-full p-2 border rounded border-blue-600 ${errors.title ? "border-red-500" : ""
          }`}
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