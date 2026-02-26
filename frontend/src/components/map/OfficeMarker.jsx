// src/components/map/OfficeMarker.jsx
import { Marker, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import placeholderIcon from "./icons/placeholder.png";

const customIcon = new Icon({
    iconUrl: placeholderIcon,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
});

const OfficeMarker = ({ office, onSelect }) => {
    return (
        <Marker
            position={office.coordinates}
            icon={customIcon}
            eventHandlers={{ click: () => onSelect(office) }}
        >
            <Tooltip
                direction="top"
                offset={[0, -35]}
                permanent
                interactive={true}
                className="!bg-transparent !border-none !shadow-none !p-0 [&::before]:hidden"
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(office);
                    }}
                    className="bg-white text-gray-800 font-semibold px-4 py-1.5 rounded-full shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    {office.institution}
                </div>
            </Tooltip>
        </Marker>
    );
};

export default OfficeMarker;