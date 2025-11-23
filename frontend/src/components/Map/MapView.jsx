import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import placeholderIcon from "./icons/placeholder.png";

//icono de markers
const customIcon = new Icon({
  iconUrl: placeholderIcon,
  iconSize: [38, 38],
});

//markers hardcodeados TODO backend
const markers = [
  { geocode: [-37.32967013550194, -59.13681692154323], popUp: "Municipalidad de Tandil" },
  { geocode: [-37.3152552168332, -59.13879327394908], popUp: "Hospital Ramón Santamarina" },
];

const MapView = () => {
    return (
        //crea el mapa, lo centra, y le pone un zoom predeterminado
        <MapContainer
            center={[-37.3217, -59.1332]}
            zoom={13}
            style={{ width: "100%", height: "100vh" }}
        >

        {/*base de mapa*/}
        <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* renderiza los marcadores */}
        {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
            </Marker>
        ))}
        </MapContainer>
    );
};

export default MapView;