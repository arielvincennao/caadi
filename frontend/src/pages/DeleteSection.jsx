import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import Button from "../components/common/Button";
import BtnBack from "../components/common/BtnBack";
import { SectionService } from "../api/services/SectionService";

export function DeleteSection() {
  const [sections, setSections] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await SectionService.getAll();
        setSections(data);
      } catch (error) {
        setFeedback({ message: "No se pudieron cargar las secciones", type: "error" });
      } finally {
        setFetching(false);
      }
    };
    fetchSections();
  }, []);

  const sectionToConfirm = sections.find(s => s.slug === selectedSlug);


  const handleDelete = async (e) => {
    if (e) e.preventDefault();

    setLoading(true);
    setFeedback({ message: "", type: "" });

    try {
      await SectionService.delete(selectedSlug);

      setFeedback({ message: `Sección "${sectionToConfirm?.title}" eliminada con éxito.`, type: "success" });

      setTimeout(() => {
        navigate("/menu");
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar:", error);
      setFeedback({ message: "Error al eliminar la sección. Intenta de nuevo.", type: "error" });
      setLoading(false);
      setShowConfirm(false);
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

        {feedback.message && (
          <div className={`mb-4 p-4 rounded-lg w-full max-w-md text-center font-medium animate-pulse ${feedback.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
            }`}>
            {feedback.message}
          </div>
        )}

        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          {!showConfirm ? (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  ¿Qué sección deseas eliminar? *
                </label>

                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  disabled={fetching || loading}
                  className="mt-1 block w-full border border-gray-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer"
                >
                  <option value="">-- Elige una sección --</option>
                  {sections.map((section) => (
                    <option key={section.id || section.slug} value={section.slug}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={() => setShowConfirm(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl shadow-md transition-all disabled:opacity-50"
                disabled={!selectedSlug || fetching}
              >
                Continuar
              </Button>
            </>
          ) : (
            
            <div className="text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-gray-800 font-medium">
                ¿Estás completamente seguro de eliminar <br />
                <span className="font-bold text-red-600">"{sectionToConfirm?.title}"</span>?
              </p>
              <p className="text-xs text-gray-500">Esta acción no se puede deshacer.</p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-all"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium shadow-sm transition-all disabled:bg-red-400"
                  disabled={loading}
                >
                  {loading ? "Eliminando..." : "Sí, eliminar"}
                </button>
              </div>
            </div>
          )}

          <p className="text-[10px] text-gray-400 text-center uppercase tracking-tighter">
            * Las secciones eliminadas dejarán de ser visibles para los usuarios inmediatamente.
          </p>
        </div>
      </section>
    </div>
  );
}

export default DeleteSection;