import { useParams } from "react-router-dom";
import { useSectionData } from "../hooks/useSectionData";
import Section from "../pages/Section";
import { Subtitle } from "../components/Typography";

/**
 * DynamicSection
 * Componente contenedor (Container Component)
 * 
 * Responsabilidades:
 * - Obtener el slug de los parámetros de la ruta
 * - Obtener los datos de la sección usando el hook personalizado
 * - Manejar estados de carga y error
 * - Renderizar el componente presentacional Section
 * 
 * NO hace acceso directo a la BD ni transformaciones complejas
 */
export default function DynamicSection() {
  const { slug } = useParams();
  const { data, loading, error } = useSectionData(slug);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-slate-100">
      <Subtitle>Cargando...</Subtitle>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">
      <Subtitle>Error: {error}</Subtitle>
    </div>;
  }

  if (!data) {
    return <div>Sección no encontrada</div>;
  }

  return <Section data={data} />;
}