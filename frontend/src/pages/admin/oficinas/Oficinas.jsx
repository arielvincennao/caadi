import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListaOficinas } from '../../../components/oficinas/ListaOficinas';
import { supabase } from '../../../../db/supabaseClient';
import BtnBack from '../../../components/common/BtnBack';
import Button from '../../../components/common/Button';

const Oficinas = () => {
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadOffices();
    }, []);

    const loadOffices = async () => {
        setLoading(true);
        try {
            const { data: rawOffices, error } = await supabase
                .from('office')
                .select('*, office_section(section(id,title))');

            if (error) throw error;

            const formattedOffices = rawOffices.map(office => {
                const mappedSections = office.office_section
                    ? office.office_section.filter(os => os.section !== null).map(os => os.section.title)
                    : [];
                return { ...office, section: mappedSections };
            });

            setOffices(formattedOffices);
        } catch (error) {
            console.error("Error al cargar las oficinas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que querés eliminar esta oficina?');
        if (!confirmDelete) return;

        try {
            const { error } = await supabase
                .from('office')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setOffices(prev => prev.filter(office => office.id !== id));
        } catch (error) {
            console.error("Error al eliminar la oficina:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center">
            <div className="max-w-6xl mx-auto justify-center w-full">
                <BtnBack />
                <div className="p-6 text-gray-800">
                    <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Gestión de Oficinas</h2>
                        <Button
                            onClick={() => navigate('/admin/oficinas/nueva')}
                        >
                            + Agregar Oficina
                        </Button>
                    </header>

                    <main>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="animate-pulse bg-gray-200 h-16 w-full rounded-lg"></div>
                                ))}
                            </div>
                        ) : (
                            <ListaOficinas
                                offices={offices}
                                onEdit={(office) => navigate(`/admin/oficinas/editar/${office.id}`)}
                                onDelete={handleDelete}
                                onViewMap={(id) => navigate(`/mapa?officeId=${id}`)}
                            />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Oficinas;