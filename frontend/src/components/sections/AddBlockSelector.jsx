export default function AddBlockSelector({ newBlockType, setNewBlockType, onAdd }) {
    return (
        <div className="mb-4 flex items-center gap-2">
            <select
                value={newBlockType}
                onChange={(e) => setNewBlockType(e.target.value)}
                className="p-2 border rounded border-blue-600"
            >
                <option value="" disabled>Seleccione tipo de bloque</option>
                <option value="card">Tarjeta</option>
                <option value="link">Botón con redireccionamiento</option>
                <option value="map">Botón para mostrar oficina/lugar en el mapa</option>
                <option value="steps">Listado de pasos</option>
                <option value="list">Lista de items</option>
                <option value="expandedCardsGroup">Tarjetas desplegables</option>
                <option value="blogEntry:event">Tarjeta de evento</option>
                <option value="blogEntry:center">Tarjeta de centro de día</option>

            </select>
            <button
                disabled={!newBlockType}
                onClick={() => {

                    onAdd(newBlockType);
                    
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Añadir bloque
            </button>
        </div>
    );
}