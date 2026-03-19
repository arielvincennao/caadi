import { useState } from "react";
import { ICON_OPTIONS } from "../../utils/iconOptions.JS";
import { Icon } from "../common/Icon";

export default function CardForm({ onSubmit, onCancel, showHref = true }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [href, setHref] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !icon) return;

        onSubmit({ title, description, icon, ...(showHref && { href }) });
    };

    return (
        <div className="flex flex-col gap-3">

            <h3 className="text-3xl font-bold text-center">Nueva tarjeta</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label className="text-sm font-bold text-blue-600 uppercase">Seleccione un icono</label>
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
                <label className="text-sm font-bold text-blue-600 uppercase">Escriba un titulo</label>
                <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded border-blue-600" />

                <label className="text-sm font-bold text-blue-600 uppercase">Escriba una breve descripción</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded border-blue-600"
                    rows={3}
                />

                {showHref && (
                    <>
                        <label className="text-sm font-bold text-blue-600 uppercase">Escriba la URL destino</label>
                        <input
                            name="href"
                            value={href}
                            placeholder="ej https://caadi.vercel.app/"
                            onChange={(e) => setHref(e.target.value)}
                            className="w-full p-2 border rounded border-blue-600"
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