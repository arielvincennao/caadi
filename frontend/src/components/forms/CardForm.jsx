import { useState } from "react";
import { ICON_OPTIONS } from "../../utils/iconOptions.JS";
import { Icon } from "../common/Icon";

export default function CardForm({ onSubmit, onCancel }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [href, setHref] = useState("");

  

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !icon) return;

        onSubmit({ title, description, icon, href });
    };

    return (
        <div className="flex flex-col gap-3">

            <h3 className="text-lg font-bold">Nueva tarjeta</h3>
            <form onSubmit={handleSubmit}>
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
                <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}  placeholder="titulo" className="w-full p-2 border rounded"/>

                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded"
                    rows={3}
                />
                <input
                    name="href"
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
                    placeholder="URL destino"
                    className="w-full p-2 border rounded"
                />


                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1 rounded bg-gray-200"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-3 py-1 rounded bg-blue-600 text-white"
                    >
                        Crear
                    </button>
                </div>
            </form>

        </div>
    );
}