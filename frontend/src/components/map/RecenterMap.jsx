/**
 * RecenterMap
 * Responsabilidades:
 * - Sincronizar el centro y el nivel de zoom del mapa Leaflet
 * - Volar a la posición indicada cuando cambian center o zoom
 */

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