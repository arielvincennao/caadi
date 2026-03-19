export default function AdminSectionPanel({ isEditing, onToggleEdit, onSave }) {
    return (
        <div className="mb-6 p-4 bg-white border-l-4 border-blue-600 shadow-sm flex justify-between items-center rounded-r-lg">
            <span className="font-bold text-blue-800">Panel de Administración</span>
            <div className="flex gap-2">
                <button
                    onClick={onToggleEdit}
                    className={`px-4 py-2 rounded font-medium transition cursor-pointer ${isEditing ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {isEditing ? "Cancelar" : "Editar Sección"}
                </button>
                {isEditing && (
                    <button
                        onClick={onSave}
                        className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 cursor-pointer"
                    >
                        Guardar
                    </button>
                )}
            </div>
        </div>
    );
}