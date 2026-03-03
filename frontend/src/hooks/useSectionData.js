import { useEffect, useState } from "react";
import { SectionService } from "../api/services/SectionService";

/**
 * useSectionData Hook
 * Custom hook que encapsula la lógica de obtención y manejo de estado
 * para una sección específica identificada por su slug
 * 
 * @param {string} slug - El slug de la sección a obtener
 * @returns {Object} { data, loading, error }
 */
export function useSectionData(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Guard clause: no hacer nada si no hay slug
    if (!slug) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const section = await SectionService.getSectionWithBlocks(slug);

        if (!isMounted) return;

        if (!section) {
          setError("Sección no encontrada");
          setData(null);
        } else {
          setData(section);
        }
      } catch (err) {
        if (!isMounted) return;

        console.error("Error loading section:", err);
        setError(err.message || "Error cargando la sección");
        setData(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function para evitar memory leaks
    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { data, loading, error };
}
