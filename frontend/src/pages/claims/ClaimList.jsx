export default function ClaimsList({ claims, loading }) {
    return (
        <div className="mb-8 border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-50 px-4 py-3 border-b">
                <span className="font-bold text-blue-800">Reclamos recibidos</span>
            </div>
            {loading ? (
                <p className="p-4 text-sm text-gray-500">Cargando...</p>
            ) : claims.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">No hay reclamos aún.</p>
            ) : (
                <div className="divide-y">
                    {claims.map(claim => (
                        <div key={claim.id} className="p-4 flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <span className="font-semibold text-sm">{claim.full_name}</span>
                                <span className="text-xs text-gray-400">
                                    {new Date(claim.created_at).toLocaleDateString("es-AR", {
                                        day: "numeric", month: "long", year: "numeric"
                                    })}
                                </span>
                            </div>
                            <span className="text-xs text-blue-600 font-medium">{claim.type}</span>
                            <span className="text-xs text-gray-500">{claim.email}</span>
                            {claim.location && (
                                <span className="text-xs text-gray-500">📍 {claim.location}</span>
                            )}
                            <p className="text-sm text-gray-700 mt-1">{claim.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}