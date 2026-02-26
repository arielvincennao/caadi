// src/components/map/CustomMapControls.jsx
import { useMap } from "react-leaflet";

const CustomMapControls = ({ onGetLocation }) => {
    const map = useMap();

    return (
        <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-3">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    map.zoomIn();
                }}
                className="bg-white shadow-lg rounded-full px-5 py-3 border border-gray-300 hover:bg-gray-50 active:scale-[0.97] text-gray-800 font-semibold flex items-center justify-center gap-2 transition-transform"
            >
                <span className="text-xl font-bold leading-none">+</span> Acercar
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    map.zoomOut();
                }}
                className="bg-white shadow-lg rounded-full px-5 py-3 border border-gray-300 hover:bg-gray-50 active:scale-[0.97] text-gray-800 font-semibold flex items-center justify-center gap-2 transition-transform"
            >
                <span className="text-xl font-bold leading-none">-</span> Alejar
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onGetLocation();
                }}
                className="bg-white shadow-lg rounded-full px-5 py-3 border border-gray-300 hover:bg-gray-50 active:scale-[0.97] text-gray-800 font-semibold flex items-center justify-center gap-2 transition-transform"
            >
                📍 ¿Dónde estoy?
            </button>
        </div>
    );
};

export default CustomMapControls;