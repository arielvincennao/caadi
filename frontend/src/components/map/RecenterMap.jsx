// src/components/map/RecenterMap.jsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) map.flyTo(center, zoom, { duration: 1.5 });
    }, [center, zoom, map]);
    return null;
};

export default RecenterMap;