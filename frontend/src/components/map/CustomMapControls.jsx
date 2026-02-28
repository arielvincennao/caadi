// src/components/map/CustomMapControls.jsx
import { useMap } from "react-leaflet";
import Button from "../common/Button";

const CustomMapControls = ({ onGetLocation }) => {
    const map = useMap();

    return (
        <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-3">
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    map.zoomIn();
                }}
                className="gap-1 button-map-control">
                <span className="text-xl">+</span> Acercar
            </Button>

            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    map.zoomOut();
                }}
                className="gap-1 button-map-control">
                <span className="text-xl">-</span> Alejar
            </Button>

            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onGetLocation();
                }}
                className="gap-2 button-map-control">
                📍 ¿Dónde estoy?
            </Button>
        </div>
    );
};

export default CustomMapControls;