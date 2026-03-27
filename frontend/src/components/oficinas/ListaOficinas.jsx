export const ListaOficinas = ({ offices, onEdit, onDelete, onViewMap }) => {
    if (!offices || offices.length === 0) {
        return <p className="text-gray-500 text-center py-8">No hay oficinas cargadas.</p>;
    }

    return (
        <div className="w-full overflow-x-auto border border-gray-200 rounded-md">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600 tracking-wide">
                        <th className="p-4 font-medium">Nombre</th>
                        <th className="p-4 font-medium">Dirección</th>
                        <th className="p-4 font-medium">Horario</th>
                        <th className="p-4 font-medium">Coordenadas</th>
                        <th className="p-4 font-medium text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {offices.map((office) => (
                        <tr key={office.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 text-gray-800">{office.name || 'Sin nombre'}</td>
                            <td className="p-4 text-gray-600">{office.address || 'Sin dirección'}</td>
                            <td className="p-4 text-gray-600">{office.schedule || 'Sin horario'}</td>
                            <td className="p-4 text-gray-600 text-sm">
                                {office.coordinates ? `${office.coordinates[0]}, ${office.coordinates[1]}` : 'N/A'}
                            </td>
                            <td className="p-4 gap-2 flex flex-col">
                                <button 
                                    onClick={() => onViewMap(office.id)} 
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
                                >
                                    Ver en mapa
                                </button>
                                <button 
                                    onClick={() => onEdit(office)} 
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => onDelete(office.id)} 
                                    className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors mt-2"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};