import { useState, useEffect } from "react";

export const useFetchOffices = (section, id) => {
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mapCenter, setMapCenter] = useState([-37.3217, -59.1332]);
    const [mapZoom, setMapZoom] = useState(13);

    useEffect(() => {
        const fetchOffices = async () => {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_SUPABASE_URL;
                const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
                const response = await fetch(`${apiUrl}/rest/v1/office?select=*`, {
                    method: 'GET',
                    headers: {
                        'apikey': apiKey,
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }

                const data = await response.json();
                const dataFiltrada = section
                    ? data.filter(office => {
                        if (Array.isArray(office.section_id)) {
                            return office.section_id.some(s => s.toLowerCase() === section.toLowerCase());
                        }
                        if (typeof office.section_id === 'string') {
                            return office.section_id.toLowerCase() === section.toLowerCase();
                        }
                        return false;
                    })
                    : data;

                setOffices(dataFiltrada);

                if (id) {
                    const targetOffice = dataFiltrada.find(o => o.id.toString() === id);

                    if (targetOffice) {
                        const coords = targetOffice.coordinates || targetOffice.coordenadas;
                        setMapCenter(coords);
                        setMapZoom(16);
                    }
                } else {
                    setMapCenter([-37.3217, -59.1332]);
                    setMapZoom(13);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffices();
    }, [section, id]);

    return { offices, loading, mapCenter, setMapCenter, mapZoom, setMapZoom };
};