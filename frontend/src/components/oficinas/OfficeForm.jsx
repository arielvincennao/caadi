import { useState, useEffect } from 'react';

export const OfficeForm = ({ initialData, availableSections, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        schedule: '',
        section: [],
        lat: -37.3217,
        lng: -59.1332
    });

    useEffect(() => {
        if (initialData) {
            let initialSections = [];
            if (initialData.section) {
                initialSections = Array.isArray(initialData.section) 
                    ? initialData.section 
                    : [initialData.section];
            }

            setFormData({
                name: initialData.name || '',
                address: initialData.address || '',
                phone: initialData.phone || '',
                email: initialData.email || '',
                schedule: initialData.schedule || '',
                section: initialSections,
                lat: initialData.coordinates ? initialData.coordinates[0] : -37.3217,
                lng: initialData.coordinates ? initialData.coordinates[1] : -59.1332
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const newSections = checked 
                ? [...prev.section, value]
                : prev.section.filter(s => s !== value);
            return { ...prev, section: newSections };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.section.length === 0) {
            alert('Por favor, seleccioná al menos una sección.');
            return;
        }

        const officeToSave = {
            ...(initialData && { id: initialData.id }),
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            schedule: formData.schedule,
            section: formData.section, 
            coordinates: [parseFloat(formData.lat), parseFloat(formData.lng)]
        };
        onSave(officeToSave);
    };

    const inputClasses = "w-full px-4 py-2 border rounded-lg"

    const labelClasses = "text-sm font-medium";

    return (
        <form onSubmit={handleSubmit} className="border border-gray-200 rounded-md p-6 bg-white max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-100">
                {initialData ? 'Editar Oficina' : 'Nueva Oficina'}
            </h3>
            
            <div className="space-y-5">
                <div>
                    <label className={labelClasses}>Nombre de la Institución:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} />
                </div>
                
                <div>
                    <label className={labelClasses}>Dirección:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClasses} placeholder="Ej: Pinto 399" />
                </div>

                <div>
                    <label className={labelClasses}>Teléfono:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="Ej: 2494..." />
                </div>
                
                <div>
                    <label className={labelClasses}>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="ejemplo@tandil.gov.ar" />
                </div>

                <div>
                    <label className={labelClasses}>Horarios de Atención:</label>
                    <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} className={inputClasses} placeholder="Ej: Lunes a Viernes de 8:00 a 14:00 hs" />
                </div>

                <div className="pt-2">
                    <label className={labelClasses}>Secciones en las que se visualiza:</label>
                    <div className="flex flex-wrap gap-4">
                        {/* Iteramos sobre las secciones reales de tu base de datos */}
                        {availableSections.map((sec) => (
                            <label key={sec.id} className="flex items-center cursor-pointer group">
                                <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded bg-white group-hover:border-gray-500 transition-colors mr-2">
                                    <input 
                                        type="checkbox" 
                                        value={sec.title} 
                                        checked={formData.section.includes(sec.title)} 
                                        onChange={handleCheckboxChange} 
                                        className="appearance-none absolute w-full h-full cursor-pointer checked:bg-gray-900 checked:border-gray-900 rounded transition-colors"
                                    />
                                    <svg className={`absolute w-3 h-3 text-white pointer-events-none transition-opacity ${formData.section.includes(sec.title) ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 text-sm">{sec.title}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                        <label className={labelClasses}>Latitud:</label>
                        <input type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} required className={inputClasses} />
                    </div>
                    <div>
                        <label className={labelClasses}>Longitud:</label>
                        <input type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} required className={inputClasses} />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3 pt-5 border-t border-gray-100">
                <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium transition-colors">
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 font-medium transition-colors">
                    Guardar
                </button>
            </div>
        </form>
    );
};
