import { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { useFetchOffices } from "../../hooks/useFetchOffices";
import OfficeModal from "./OfficeModal";
import BtnBack from "../common/BtnBack";
import RecenterMap from "./RecenterMap";
import CustomMapControls from "./CustomMapControls";
import OfficeMarker from "./OfficeMarker";

const MapView = () => {
    const [searchParams] = useSearchParams();
    const section = searchParams.get("seccion");
    const id = searchParams.get("id");
    const customTitle = searchParams.get("mapTitle");

    const {
        offices,
        loading,
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
        refetch
    } = useFetchOffices(section, id);

    const [selectedOffice, setSelectedOffice] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const mapRef = useRef(null);

    let titulosection = "Todas las ubicaciones";

    if (customTitle) {
        titulosection = customTitle;
    } else if (section) {
        titulosection = section.charAt(0).toUpperCase() + section.slice(1);
    } else if (id) {
        const oficinaSeleccionada = offices.find(o => o.id.toString() === id);

        if (oficinaSeleccionada) {
            titulosection = oficinaSeleccionada.name;
        } else if (loading) {
            titulosection = "Cargando...";
        }
    }

    const getUserLocation = () => {
        if (!navigator.geolocation) return alert("Tu navegador no soporta geolocalización");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserPosition([latitude, longitude]);
                setMapCenter([latitude, longitude]);
                setMapZoom(16);
            },
            (error) => {
                console.error("Error GPS:", error);
                alert("No se pudo obtener tu ubicación. Asegúrate de dar permisos.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    useEffect(() => {
        if (!loading && mapRef.current) {
            setTimeout(() => mapRef.current.invalidateSize(), 100);
        }
    }, [loading]);

    if (!mapCenter && loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-gray-100">
                <p className="text-xl font-semibold text-gray-600">Iniciando mapa...</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
            {/* Header Flotante */}
            <div className="absolute top-4 left-4 z-[1000] flex items-center gap-3 pointer-events-none">
                <div className="pointer-events-auto">
                    <BtnBack />
                </div>
                <div className="bg-white p-2 rounded-full shadow-md border border-gray-200 pointer-events-auto">
                    <h1 className="text-gray-800 font-bold text-lg capitalize tracking-wide text-center">
                        {titulosection}
                    </h1>
                </div>
            </div>

            {loading && (
                <div className="absolute inset-0 z-[2000] bg-white/40 backdrop-blur-sm flex items-center justify-center pointer-events-none transition-all duration-300">
                    <div className="bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-200 flex items-center gap-3">
                        <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-semibold text-gray-700">Actualizando ubicaciones...</p>
                    </div>
                </div>
            )}

            {/* Modal */}
            {selectedOffice && (
                <OfficeModal
                    office={selectedOffice}
                    onClose={() => setSelectedOffice(null)}
                    onsSave={refetch}
                />
            )}

            {/* Contenedor del Mapa Siempre Renderizado */}
            {mapCenter && (
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ width: "100%", height: "100%", zIndex: 1 }}
                    zoomControl={false}
                    whenCreated={(map) => (mapRef.current = map)}
                >
                    <RecenterMap center={mapCenter} zoom={mapZoom} />

                    <CustomMapControls onGetLocation={getUserLocation} />

                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Marcadores */}
                    {offices.map((office) => (
                        <OfficeMarker
                            key={office.id}
                            office={office}
                            onSelect={setSelectedOffice}
                        />
                    ))}

                    {/* Marcador de Usuario */}
                    {userPosition && (
                        <Marker position={userPosition}>
                            <Tooltip direction="top">Estás acá</Tooltip>
                        </Marker>
                    )}
                </MapContainer>
            )}
        </div>
    );
};

export default MapView;