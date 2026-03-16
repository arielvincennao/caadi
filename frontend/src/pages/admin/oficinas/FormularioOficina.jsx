import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OfficeForm } from '../../../components/oficinas/OfficeForm';
import BtnBack from '../../../components/common/BtnBack';
import { supabase } from '../../../../db/supabaseClient';


const FormularioOficina = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [dbSections, setDbSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFormData = async () => {
            
            setIsLoading(true);
            try {
                // 1. Cargamos secciones
                const { data: sectionsData, error: secError } = await supabase
                    .from('section')
                    .select('id,title');
                if (secError) throw secError;
                setDbSections(sectionsData);

                // 2. Cargamos oficina si hay ID
                if (id) {
                    const { data: officeDataArray, error: offError } = await supabase
                        .from('office')
                        .select('*, office_section(section(id,title))')
                        .eq('id', id);

                    if (offError) throw offError;

                    if (officeDataArray && officeDataArray.length > 0) {
                        const office = officeDataArray[0];
                        office.section = office.office_section
                            ? office.office_section.filter(os => os.section !== null).map(os => os.section.title)
                            : [];
                        setInitialData(office);
                    }
                }
            } catch (error) {
                console.error("Error al cargar datos del formulario:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFormData();
    }, [id]);

    const handleSave = async (officeData) => {
        try {
            const sectionIdsToLink = officeData.section.map(secTitle => {
                const found = dbSections.find(s => s.title === secTitle);
                return found ? found.id : null;
            }).filter(sid => sid !== null);

            const payload = {
                name: officeData.name,
                address: officeData.address,
                phone: officeData.phone,
                email: officeData.email,
                schedule: officeData.schedule,
                coordinates: officeData.coordinates
            };

            let currentOfficeId = officeData.id;

            if (currentOfficeId) {
                // UPDATE (Edición)
                const { error: updateError } = await supabase
                    .from('office')
                    .update(payload)
                    .eq('id', currentOfficeId);
                if (updateError) throw updateError;

                // Borramos relaciones viejas
                const { error: deleteRelError } = await supabase
                    .from('office_section')
                    .delete()
                    .eq('office_id', currentOfficeId);
                if (deleteRelError) throw deleteRelError;
            } else {
                // INSERT (Creación) - Agregamos .select() para que devuelva el registro creado
                const { data: insertedData, error: insertError } = await supabase
                    .from('office')
                    .insert(payload)
                    .select();

                if (insertError) throw insertError;
                currentOfficeId = insertedData[0].id;
            }

            // Insertamos las relaciones nuevas
            if (sectionIdsToLink.length > 0) {
                const relationsPayload = sectionIdsToLink.map(secId => ({
                    office_id: currentOfficeId,
                    section_id: secId
                }));

                const { error: relError } = await supabase
                    .from('office_section')
                    .insert(relationsPayload);
                if (relError) throw relError;
            }

            navigate('/admin/oficinas');

        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar la oficina.");
        }
    };

    if (isLoading) {
        return <div className="p-10 text-center text-gray-500">Cargando formulario...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 text-gray-800">
            <BtnBack />
            <OfficeForm
                initialData={initialData}
                availableSections={dbSections}
                onSave={handleSave}
                onCancel={() => navigate('/admin/oficinas')}
            />
        </div>
    );
};

export default FormularioOficina;