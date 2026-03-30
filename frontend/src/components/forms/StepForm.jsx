import { useState } from "react";
import { Icon } from "../common/Icon";
import { ICON_OPTIONS } from "../../utils/iconOptions.JS";


export default function StepForm({ onSubmit, onCancel }) {
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");


    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!description.trim()) newErrors.description = "La descripción es obligatoria";
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

        onSubmit({ description, icon });
    };

    return (
        <div className="flex flex-col gap-3">

            <h3 className="text-3xl font-bold text-center">Nuevo paso</h3>
            <form className="flex flex-col gap-2">
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
                            className={`p-2 border rounded ${icon === ico ? 'bg-blue-100 border-blue-600 border-2' : ''}`}
                        >
                            <Icon name={ico} className="w-6 h-6" />
                        </button>
                    ))}
                </div>
                <label className="text-sm font-bold text-blue-600 uppercase">Escriba una breve descripción</label>
                {errors.description && <p className="text-red-500 text-sm font-bold uppercase">{errors.description}</p>}

                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        clearError("description")

                    }}
                    className={`w-full p-2 border rounded border-blue-600 ${errors.description ? "border-red-500" : ""
                        }`}
                    rows={3}
                />

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Crear
                    </button>
                </div>
            </form>

        </div>
    );
}