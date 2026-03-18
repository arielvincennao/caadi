import { useState } from "react";
import { Icon } from "../common/Icon";
import { ICON_OPTIONS } from "../../utils/iconOptions.JS";


export default function StepForm({ onSubmit, onCancel }) {
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !icon) return;

        onSubmit({ description, icon });
    };

    return (
        <div className="flex flex-col gap-3">

            <h3 className="text-lg font-bold">Nuevo paso</h3>
            <form>
                <div className="flex gap-2 flex-wrap">
                    {ICON_OPTIONS.map((ico) => (
                        <button
                            key={ico}
                            type="button"
                            onClick={() => setIcon(ico)}
                            className={`p-2 border rounded ${icon === ico ? 'bg-blue-200' : ''}`}
                        >
                            <Icon name={ico} className="w-6 h-6" />
                        </button>
                    ))}
                </div>

                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded"
                    rows={3}
                />

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1 rounded bg-gray-200"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-3 py-1 rounded bg-blue-600 text-white"
                    >
                        Crear
                    </button>
                </div>
            </form>

        </div>
    );
}