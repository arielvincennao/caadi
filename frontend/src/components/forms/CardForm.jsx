import { useState } from "react";
import { ICON_OPTIONS } from "../../utils/iconOptions.JS";
import { Icon } from "../common/Icon";

export default function CardForm({ onSubmit, onCancel, showHref = true }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [href, setHref] = useState("");

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!title.trim()) newErrors.title = "El titulo es obligatorio";
        if (!description.trim()) newErrors.description = "La descripción es obligatoria";
        if (showHref && !href.trim()) newErrors.href = "La URL destino es obligatoria";
        if (!icon.trim()) newErrors.icon = "El icono es obligatorio";
        return newErrors;
    };

    const clearError = (field) => {
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        onSubmit({ title, description, icon, ...(showHref && { href }) });
    };

    return (
        <div className="flex flex-col gap-3">

            <h3 className="text-3xl font-bold text-center">Nueva tarjeta</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label className="text-sm font-bold text-blue-600 uppercase">Seleccione un icono</label>
                {errors.icon && <p className="text-red-500 text-sm font-bold uppercase">{errors.icon}</p>}

                <div className="flex gap-2 flex-wrap">
                    {ICON_OPTIONS.map((ico) => (
                        <button
                            key={ico}
                            type="button"
                            onClick={() => {
                                setIcon(ico);
                                clearError("icon");

                            }}
                            className={`p-2 border rounded ${icon === ico ? 'bg-blue-200' : ''}`}
                        >
                            <Icon name={ico} className="w-6 h-6" />
                        </button>
                    ))}
                </div>
                <label className="text-sm font-bold text-blue-600 uppercase">Escriba un titulo</label>
                {errors.title && <p className="text-red-500 text-sm font-bold uppercase">{errors.title}</p>}

                <input name="title" value={title} onChange={(e) => {
                    setTitle(e.target.value);
                    clearError("title");
                }} 
                className={`w-full p-2 border rounded border-blue-600 ${errors.title ? "border-red-500" : ""
                    }`} />

                <label className="text-sm font-bold text-blue-600 uppercase">Escriba una breve descripción</label>
                {errors.description && <p className="text-red-500 text-sm font-bold uppercase">{errors.description}</p>}

                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value); 
                        clearError("description");
                    }}
                    className={`w-full p-2 border rounded border-blue-600 ${errors.description ? "border-red-500" : ""
                        }`}
                    rows={3}
                />

                {showHref && (
                    <>
                        <label className="text-sm font-bold text-blue-600 uppercase">Escriba la URL destino</label>
                        {errors.href && <p className="text-red-500 text-sm font-bold uppercase">{errors.href}</p>}

                        <input
                            name="href"
                            value={href}
                            placeholder="ej https://caadi.vercel.app/"
                            onChange={(e) => {
                                setHref(e.target.value);
                                clearError("href");
                            }}
                            className={`w-full p-2 border rounded border-blue-600 ${errors.title ? "border-red-500" : ""
                                }`}
                        />
                    </>
                )}

                <div className="flex justify-end gap-2 mt-2">
                    <button onClick={onCancel} className="px-2 py-2 rounded font-medium transition cursor-pointer bg-gray-200 hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="px-2 py-2 rounded font-medium transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700">Crear</button>
                </div>
            </form>

        </div>
    );
}