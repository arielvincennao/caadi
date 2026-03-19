import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import Button from "../components/common/Button";
import BtnBack from "../components/common/BtnBack";
import { SectionService } from "../api/services/SectionService";

export function DeleteSection() {
  const [sections, setSections] = useState([]); // Todas las secciones
  const [selectedSlug, setSelectedSlug] = useState(""); // El slug elegido
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // Estado de carga inicial
  const navigate = useNavigate();

  // 1. Cargar las secciones al iniciar
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await SectionService.getAll();
        setSections(data);
      } catch (error) {
        console.error("Error al cargar secciones:", error);
        alert("No se pudieron cargar las secciones");
      } finally {
        setFetching(false);
      }
    };
    fetchSections();
  }, []);

  // 2. Ejecutar la eliminación
  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!selectedSlug) {
      alert("Por favor, selecciona una sección");
      return;
    }

    // Buscamos el objeto completo para mostrar el nombre real en el confirm
    const sectionToConfirm = sections.find(s => s.slug === selectedSlug);

    if (!window.confirm(`¿Estás seguro de eliminar "${sectionToConfirm?.title || selectedSlug}"?`)) {
      return;
    }

    setLoading(true);
    try {
      // Usamos el slug (o el ID si tu service lo requiere)
      await SectionService.delete(selectedSlug);
      
      alert("Sección eliminada exitosamente");
      navigate("/menu");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar la sección. Verifica si el service soporta borrado por slug.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>

      <section className="flex flex-col items-center pb-10 pt-20 md:pt-4">
        <Title className="m-4 md:text-2xl text-red-600">Eliminar Sección</Title>

        <form onSubmit={handleDelete} className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona la sección a eliminar
            </label>
            
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              required
              disabled={fetching || loading}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-red-500 focus:border-red-500"
            >
              <option value="">-- Selecciona un slug --</option>
              {fetching ? (
                <option>Cargando slugs...</option>
              ) : (
                sections.map((section) => (
                  <option key={section.id || section.slug} value={section.slug}>
                    {section.slug} ({section.title})
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={loading || fetching || !selectedSlug}
            >
              {loading ? "Eliminando..." : "Eliminar Definitivamente"}
            </Button>
          </div>
          
          <p className="text-xs text-gray-400 text-center">
            * Se muestran los slugs únicos registrados en el sistema.
          </p>
        </form>
      </section>
    </div>
  );
}

export default DeleteSection;