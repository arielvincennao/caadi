import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import BtnBack from '../components/common/BtnBack';
import Button from '../components/common/Button';
import { Title, Text } from '../components/Typography';
import { supabase } from "../../db/supabaseClient";

function Reclamos() {

  const [formData, setFormData] = useState({
    type: '',
    full_name: '',
    email: '',
    location: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const claimType = [
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

    // limpia el error del campo al escribir
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // VALIDACIÓN
  const validate = () => {
    const newErrors = {};

    if (!formData.type) newErrors.type = "Seleccione un tipo";
    if (!formData.full_name.trim()) newErrors.full_name = "El nombre es obligatorio";

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria";
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setSubmitError(null);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const payload = {
      "Tipo de queja": formData.type,
      "Nombre completo": formData.full_name,
      "Correo electrónico": formData.email,
      "Ubicación": formData.location,
      "Descripción": formData.description,
    };

    try {
      // guarda en supabase
      const { error } = await supabase.from("claim").insert([formData]);
      if (error) throw error;

      // envia al email
      const response = await fetch("https://formspree.io/f/xlgwvbel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();

      setSuccess(true);

      // resetea el form
      setFormData({
        type: "",
        full_name: "",
        email: "",
        location: "",
        description: "",
      });

    } catch (error) {
      setSubmitError("Ocurrió un error al enviar el formulario.");
    } finally {
      setLoading(false);
    }
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
            Complete el siguiente formulario para enviar su reclamo.
          </Text>
          <Text className="mb-6 text-gray-500 italic text-center text-base font-medium">
            Nota: Este formulario tiene fines informativos y de relevamiento. No constituye un canal oficial de reclamos.
          </Text>
        </section>

        {/* MENSAJES POST-SUBMIT */}
        {success && (
          <div role="status" aria-live="polite" className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Reclamo enviado correctamente
          </div>
        )}

        {submitError && (
          <div role="alert" className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            Error al enviar el reclamo {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* TIPO */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tipo de queja *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              aria-invalid={!!errors.type}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">Seleccione</option>
              {claimType.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>

          {/* NOMBRE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nombre completo *</label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              aria-invalid={!!errors.full_name}
              className="px-4 py-2 border rounded-lg"
            />
            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email *</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              className="px-4 py-2 border rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* UBICACION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Ubicación *</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              aria-invalid={!!errors.location}
              className="px-4 py-2 border rounded-lg"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          {/* DESCRIPCION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Descripción *</label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              aria-invalid={!!errors.description}
              className="px-4 py-2 border rounded-lg"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* BOTON SUBMIT */}
          <div className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              <Text>
                {loading ? "Enviando..." : "Enviar reclamo"}
              </Text>
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Reclamos;