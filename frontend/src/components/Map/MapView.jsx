import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { offices } from "../../data/offices"
import OfficeModal from "../map/OfficeModal";

import placeholderIcon from "./icons/placeholder.png";
import { useState } from "react";

//icono de markers
const customIcon = new Icon({
  iconUrl: placeholderIcon,
  iconSize: [38, 38],
});


const MapView = () => {
  const [selectedOffice, setSelectedOffice] = useState(null)
  return (
    <>
      {selectedOffice && (
        <OfficeModal
          office={selectedOffice}
          onClose={() => setSelectedOffice(null)}
        />
      )}
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
        {offices.map((office) => (
          <Marker
            key={office.id}
            position={office.geocode}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedOffice(office)
            }}
          />
        ))}
      </MapContainer>
    </>
  );
};

export default MapView;

