import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import { OfficeService } from "../../../api/services/OfficeService";
import { ContentBlockService } from "../../../api/services/ContentBlockService";
import { Icon } from "../../common/Icon";

export default function MapBlock({ block, isEditing, isAdmin, onChange }) {
    const navigate = useNavigate();
    const [data, setData] = useState(block.data || {});
    const [localEditing, setLocalEditing] = useState(false);
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        setData(block.data || {});
    }, [block.data]);

    useEffect(() => {
        if (localEditing) {
            OfficeService.getAll()
                .then(setOffices)
                .catch(err => console.error("Error cargando oficinas:", err));
        }
    }, [localEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...data, [name]: value };
        setData(updated);
        onChange && onChange(block.id, updated);
    };

    const handleOfficeSelect = (e) => {
        const selectedId = e.target.value;
        const selectedOffice = offices.find(o => o.id === selectedId) || {};

        const updated = {
            ...data,
            officeId: selectedId,
            section: selectedOffice.sectionSlug || data.section
        };

        setData(updated);
        onChange && onChange(block.id, updated);
    };

    const handleSave = async () => {
        try {
            await ContentBlockService.updateBlock(block.id, data);
            setLocalEditing(false);
        } catch (error) {
            console.error("Error al guardar el bloque de contenido:", error);
        }
    };

    const { section, officeId, title, mapTitle } = data;

    const handleNavigation = () => {
        const params = new URLSearchParams();

        if (section) params.append('section', section);
        if (officeId) params.append('officeId', officeId);
        if (mapTitle) params.append('mapTitle', mapTitle);

        const queryString = params.toString();

        if (queryString) {
            navigate(`/mapa?${queryString}`);
        } else {
            navigate('/mapa');
        }
    };

    return (
        <div className="relative">
            {isAdmin && isEditing && (
                <div className="absolute top-1 right-2 z-10 flex gap-1">
                    {!localEditing ? (
                        <button onClick={() => setLocalEditing(true)} className="p-1 bg-blue-600 text-white rounded-full cursor-pointer"><Icon name={"editar"} className={"w-6 h-6 p-1"} /></button>
                    ) : (
                        <>
                            <button onClick={handleSave} className="bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm cursor-pointer" title="Guardar cambios">OK</button>
                            <button onClick={() => setLocalEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm cursor-pointer" title="Cancelar">X</button>
                        </>
                    )}
                </div>
            )}
            {isAdmin && isEditing && localEditing && (
                <div className="mb-3 bg-white border rounded  pb-2 p-2 border-gray-400">

                    <label className="text-sm font-bold text-blue-600 uppercase">Oficina que se mostrará en el mapa.</label>
                    <select
                        name="officeId"
                        value={data.officeId || ""}
                        onChange={handleOfficeSelect}
                        className="w-full p-2 border rounded border-blue-600"
                    >
                        <option value="">Selecciona una oficina...</option>
                        {offices.map(office => (
                            <option key={office.id} value={office.id}>
                                {office.name}
                            </option>
                        ))}
                    </select>

                    <p className="text-sm ms-1 text-gray-500">
                        Si desea agregar un nuevo lugar/oficina, lo puede hacer volviendo al menú principal, en el botón de "Gestionar oficinas/lugares del mapa".
                    </p>

                    <label className="text-sm font-bold text-blue-600 uppercase">Titulo del botón (opcional)</label>
                    <input
                        name="title"
                        value={data.title || ""}
                        onChange={handleChange}
                        placeholder="Ver ubicación en el mapa"
                        className=" mb-2 w-full p-2 border rounded border-blue-600"
                    />

                    <label className="text-sm font-bold text-blue-600 uppercase">Título que se mostrará en el mapa (opcional)</label>
                    <input
                        name="mapTitle"
                        value={data.mapTitle || ""}
                        onChange={handleChange}
                        placeholder="Ejemplo: Oficinas para tramitar el pase"
                        className="w-full mb-2 p-2 border rounded border-blue-600"
                    />
                </div>
            )}
            <Button onClick={handleNavigation} icon="ubicacion">
                {title || "Ver ubicación en el mapa"}
            </Button>
        </div>
    );
}

MapBlock.hasEditor = true;