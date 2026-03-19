import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListaOficinas } from '../../../components/oficinas/ListaOficinas';
import { OfficeService } from '../../../api/services/OfficeService';
import BtnBack from '../../../components/common/BtnBack';
import Button from '../../../components/common/Button';
import Navbar from '../../../components/layout/Navbar';

const Oficinas = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    setLoading(true);
    try {
      const data = await OfficeService.getAll();
      setOffices(data);
    } catch (error) {
      console.error("Error al cargar las oficinas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await OfficeService.delete(confirmId);
      setOffices(prev => prev.filter(o => o.id !== confirmId));
      setConfirmId(null);
    } catch (error) {
      console.error("Error al eliminar la oficina:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>
      <div className="max-w-6xl mx-auto justify-center w-full">
        <div className="p-6 text-gray-800">
          <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Gestionar Oficinas/Lugares del mapa</h2>
            <Button onClick={() => navigate('/admin/oficinas/nueva')}>
              + Agregar Oficina
            </Button>
          </header>

          <main>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="animate-pulse bg-gray-200 h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <ListaOficinas
                offices={offices}
                onEdit={(office) => navigate(`/admin/oficinas/editar/${office.id}`)}
                onDelete={(id) => setConfirmId(id)}
                onViewMap={(id) => navigate(`/mapa?id=${id}`)}
              />
            )}
          </main>
        </div>
      </div>

      {confirmId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Eliminar oficina</h3>
            <p className="text-gray-600 text-sm mb-6">¿Estás seguro de que querés eliminar esta oficina? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Oficinas;