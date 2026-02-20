// src/components/map/MapView.jsx
import { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";

// Hooks y Datos
import { useFetchOffices } from "../../hooks/useFetchOffices";

// Componentes
import OfficeModal from "./OfficeModal";
import BtnBack from "../common/BtnBack";
import RecenterMap from "./RecenterMap";
import CustomMapControls from "./CustomMapControls";
import OfficeMarker from "./OfficeMarker";

const MapView = () => {
    const [searchParams] = useSearchParams();
    const seccion = searchParams.get("seccion");
    const institucionId = searchParams.get("institucion");

    // Consumimos la lógica separada en el Custom Hook
    const { 
        offices, 
        loading, 
        mapCenter, 
        setMapCenter, 
        mapZoom, 
        setMapZoom 
    } = useFetchOffices(seccion, institucionId);

    const [selectedOffice, setSelectedOffice] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const mapRef = useRef(null);

    const tituloSeccion = seccion
        ? seccion.charAt(0).toUpperCase() + seccion.slice(1)
        : "Todas las ubicaciones";

    // Geolocalización
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

    // Fix visual para el tamaño del mapa de Leaflet
    useEffect(() => {
        if (!loading && mapRef.current) {
            setTimeout(() => mapRef.current.invalidateSize(), 100);
        }
    }, [loading]);

    return (
        <div className="relative w-full h-screen bg-gray-100">
            {/* Header Flotante */}
            <div className="absolute top-4 left-4 z-[1000] flex items-center gap-3 pointer-events-none">
                <div className="pointer-events-auto">
                    <BtnBack />
                </div>
                <div className="bg-white px-5 py-2 rounded-full shadow-md border border-gray-200 pointer-events-auto">
                    <h1 className="text-gray-800 font-bold text-lg capitalize tracking-wide text-center">
                        {tituloSeccion}
                    </h1>
                </div>
            </div>

            {/* Modal */}
            {selectedOffice && (
                <OfficeModal
                    office={selectedOffice}
                    onClose={() => setSelectedOffice(null)}
                />
            )}

            {/* Contenedor del Mapa */}
            {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-xl font-semibold text-gray-600">Cargando mapa...</p>
                </div>
            ) : (
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ width: "100%", height: "100%" }}
                    zoomControl={false}
                    whenCreated={(map) => (mapRef.current = map)}
                >
                    <RecenterMap center={mapCenter} zoom={mapZoom} />

                    <CustomMapControls onGetLocation={getUserLocation} />

                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Marcadores Modulares */}
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