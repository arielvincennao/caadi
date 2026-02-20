import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import BtnBack from '../components/common/BtnBack';
import Button from '../components/common/Button';
import { Title, Text } from '../components/Typography';

function Reclamos() {
  const [formData, setFormData] = useState({
    tipoQueja: '',
    nombre: '',
    correo: '',
    descripcion: ''
  });

  //TODO: agregar los tipos de quejas que vienen de la base de datos, verificar que se actualicen cuando se agreguen o eliminen en administración
  const tiposQueja = [
    'Accesibilidad física',
    'Accesibilidad digital',
    'Atención al público',
    'Transporte público',
    'Espacios públicos',
    'Otros'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Reclamo enviado con éxito');
    setFormData({
      tipoQueja: '',
      nombre: '',
      correo: '',
      descripcion: ''
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="absolute top-23 left-4 md:top-25 mt-5 md:left-10 z-10">
        <BtnBack />
      </div>
      <div className="p-3 md:w-[70%] pt-20 md:pt-3 max-w-2xl">
        <section className="flex flex-col items-center text-center md:items-start mb-8">
          <Title className="mb-4">Reclamos de Accesibilidad</Title>
          <Text className="mb-6">
            Complete el siguiente formulario para enviar su reclamo. Nos pondremos en contacto con usted a la brevedad.
          </Text>
        </section>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="tipoQueja" className="text-sm font-medium text-gray-700">
              Tipo de queja *
            </label>
            <select
              id="tipoQueja"
              name="tipoQueja"
              value={formData.tipoQueja}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccione un tipo de queja</option>
              {tiposQueja.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingrese su nombre completo"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="correo" className="text-sm font-medium text-gray-700">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
              Descripción de la queja *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows={6}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describa su reclamo en detalle..."
            />
          </div>

          <div className="mt-4">
            <Button type="submit" className="w-full">
              <Text>Enviar</Text>
            </Button>
          </div>
          <Text className="mb-6 text-gray-500 italic text-center text-base font-medium">
            NOTA: Esto NO es un servicio, es un relevamiento
          </Text>
        </form>
      </div>
    </div>
  );
}

export default Reclamos;
