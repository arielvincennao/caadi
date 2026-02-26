// src/hooks/useFetchOffices.js
import { useState, useEffect } from "react";
import { mockOffices } from "../data/offices";

export const useFetchOffices = (seccion, institucionId) => {
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Centro por defecto
    const [mapCenter, setMapCenter] = useState([-37.3217, -59.1332]); 
    const [mapZoom, setMapZoom] = useState(13);

    useEffect(() => {
        const fetchOffices = async () => {
            setLoading(true);
            try {
                /* CÓDIGO PARA LA API
                
                // Usamos la variable de entorno de Vite para la URL de tu API
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                const response = await fetch(`${apiUrl}/api/oficinas`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }
                
                const data = await response.json();

                // Filtrado por sección (Si tu API Express ya filtra por query params, 
                // podés pasarle la 'seccion' a la URL del fetch y omitir este paso)
                const dataFiltrada = seccion
                    ? data.filter(office => office.seccion === seccion)
                    : data;

                setOffices(dataFiltrada);

                // Lógica de centrado del mapa
                if (institucionId) {
                    const targetOffice = dataFiltrada.find(o => o.id.toString() === institucionId);
                    if (targetOffice) {
                        setMapCenter(targetOffice.coordenadas);
                        setMapZoom(16);
                    }
                } else {
                    setMapCenter([-37.3217, -59.1332]); 
                    setMapZoom(13);
                }*/

                // CÓDIGO MOCK 

                const dataFiltrada = seccion
                    ? mockOffices.filter(office => office.seccion === seccion)
                    : mockOffices;

                setOffices(dataFiltrada);

                if (institucionId) {
                    const targetOffice = dataFiltrada.find(o => o.id.toString() === institucionId);
                    if (targetOffice) {
                        setMapCenter(targetOffice.coordenadas);
                        setMapZoom(16);
                    }
                } else {
                    setMapCenter([-37.3217, -59.1332]);
                    setMapZoom(13);
                }

            } catch (error) {
                console.error("Error cargando oficinas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffices();
    }, [seccion, institucionId]);

    return { offices, loading, mapCenter, setMapCenter, mapZoom, setMapZoom };
};