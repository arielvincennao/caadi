/**
 * useFetchOffices
 * Responsabilidades:
 * - Cargar oficinas por sección o por id y exponer centro y zoom del mapa
 * - Gestionar estado de carga y ofrecer refetch para volver a pedir datos
 */
import { useState, useEffect } from "react";
import { OfficeService } from "../api/services/OfficeService";

export const useFetchOffices = (section, id) => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([-37.3217, -59.1332]);
  const [mapZoom, setMapZoom] = useState(13);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchOffices = async () => {
      setLoading(true);
      try {
        let data = [];

        if (id) {
          data = await OfficeService.getById(id);
          if (data.length > 0) {
            setMapCenter(data[0].coordinates);
            setMapZoom(16);
          }
        } else {
          data = await OfficeService.getBySection(section);
          setMapCenter([-37.3217, -59.1332]);
          setMapZoom(13);
        }

        setOffices(data);
      } catch (error) {
        console.error("Error al obtener oficinas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, [section, id, refreshKey]);

  const refetch = () => setRefreshKey(prev => prev + 1);

  return { offices, loading, mapCenter, setMapCenter, mapZoom, setMapZoom, refetch };
};