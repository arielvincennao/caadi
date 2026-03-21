import { useState } from 'react';
import { ClaimFormService } from '../../api/services/ClaimFormService';

export default function ClaimFormEditor({ formConfig, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: formConfig?.title || "",
        description: formConfig?.description || "",
        note: formConfig?.note || "",
        claim_types: formConfig?.claim_types || [],
        fields: formConfig?.fields || []
    });
    const [newType, setNewType] = useState("");
    const [saving, setSaving] = useState(false);
    const [newField, setNewField] = useState({ name: "", label: "", type: "text", required: true });

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddType = () => {
        if (!newType.trim()) return;
        setEditData(prev => ({ ...prev, claim_types: [...prev.claim_types, newType.trim()] }));
        setNewType("");
    };

    const handleAddField = () => {
        if (!newField.name.trim() || !newField.label.trim()) return;
        setEditData(prev => ({ ...prev, fields: [...prev.fields, newField] }));
        setNewField({ name: "", label: "", type: "text", required: true });
    };

    const handleRemoveType = (index) => {
        setEditData(prev => ({
            ...prev,
            claim_types: prev.claim_types.filter((_, i) => i !== index)
        }));
    };

    const handleRemoveField = (index) => {
        setEditData(prev => ({
            ...prev,
            fields: prev.fields.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await ClaimFormService.updateTexts(formConfig.id, {
                title: editData.title,
                description: editData.description,
                note: editData.note
            });
            await ClaimFormService.updateClaimTypes(formConfig.id, editData.claim_types);
            await ClaimFormService.updateFields(formConfig.id, editData.fields);
            onUpdate({ ...editData, id: formConfig.id });
            setIsEditing(false);
        } catch (err) {
            console.error("Error guardando configuración:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mb-6 p-4 bg-white border-l-4 border-blue-600 shadow-sm rounded-r-lg">
            <div className="flex justify-between items-center">
                <span className="font-bold text-blue-800">Panel de Administración</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setIsEditing(!isEditing);
                            if (isEditing) setEditData({
                                title: formConfig?.title || "",
                                description: formConfig?.description || "",
                                note: formConfig?.note || "",
                                claim_types: formConfig?.claim_types || [],
                                fields: formConfig?.fields || []
                            });
                        }}
                        className={`px-4 py-2 rounded font-medium transition ${isEditing ? 'bg-red-100 text-red-600' : 'bg-blue-600 text-white'}`}
                    >
                        {isEditing ? "Cancelar" : "Editar formulario"}
                    </button>
                    {isEditing && (
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 disabled:opacity-50"
                        >
                            {saving ? "Guardando..." : "Guardar"}
                        </button>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="mt-4 flex flex-col gap-6">

                    {/* Textos */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-blue-600 uppercase">Textos</span>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">Título</label>
                            <input
                                name="title"
                                value={editData.title}
                                onChange={handleTextChange}
                                className="px-3 py-2 border rounded-lg text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">Descripción</label>
                            <textarea
                                name="description"
                                value={editData.description}
                                onChange={handleTextChange}
                                rows={2}
                                className="px-3 py-2 border rounded-lg text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">Nota</label>
                            <textarea
                                name="note"
                                value={editData.note}
                                onChange={handleTextChange}
                                rows={2}
                                className="px-3 py-2 border rounded-lg text-sm"
                            />
                        </div>
                    </div>

                    {/* Tipos de reclamo */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-blue-600 uppercase">Tipos de reclamo</span>
                        <div className="flex flex-col gap-2">
                            {editData.claim_types.map((type, index) => (
                                <div key={index} className="flex justify-between items-center px-3 py-2 border rounded-lg text-sm bg-gray-50">
                                    <span>{type}</span>
                                    <button
                                        onClick={() => handleRemoveType(index)}
                                        className="text-red-500 hover:text-red-700 font-bold text-xs"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                value={newType}
                                onChange={(e) => setNewType(e.target.value)}
                                placeholder="Nuevo tipo de reclamo"
                                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                                onKeyDown={(e) => e.key === "Enter" && handleAddType()}
                            />
                            <button
                                onClick={handleAddType}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>

                    {/* Campos del formulario */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-blue-600 uppercase">Campos del formulario</span>
                        <div className="flex flex-col gap-2">
                            {editData.fields.map((field, index) => (
                                <div key={index} className="flex justify-between items-center px-3 py-2 border rounded-lg text-sm bg-gray-50">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{field.label}</span>
                                        <span className="text-xs text-gray-400">{field.type} {field.required ? "· obligatorio" : "· opcional"}</span>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveField(index)}
                                        className="text-red-500 hover:text-red-700 font-bold text-xs"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Edición de nuevo campo */}
                    <div className="flex flex-col gap-2 border rounded-lg p-3 bg-gray-50">
                        <span className="text-xs text-gray-500 font-bold uppercase">Nuevo campo</span>
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1 flex-1">
                                <label className="text-xs text-gray-400">Nombre interno</label>
                                <input
                                    value={newField.name}
                                    onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="ej: dni"
                                    className="px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <label className="text-xs text-gray-400">Nombre visible</label>
                                <input
                                    value={newField.label}
                                    onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                                    placeholder="ej: DNI"
                                    className="px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-400">Requerido</label>
                                <select
                                    value={newField.required}
                                    onChange={(e) => setNewField(prev => ({ ...prev, required: e.target.value === "true" }))}
                                    className="px-3 py-2 border rounded-lg text-sm"
                                >
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleAddField}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 mt-1"
                        >
                            + Agregar campo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}