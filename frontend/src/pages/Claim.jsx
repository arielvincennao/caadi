import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import BtnBack from '../components/common/BtnBack';
import Button from '../components/common/Button';
import { Title, Text } from '../components/Typography';
import { ClaimService } from '../api/services/ClaimService';
import { useClaimForm } from '../hooks/useClaimForm';

function Claim() {
  const { formConfig, loading: configLoading } = useClaimForm();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (formConfig?.fields) {
      const initialData = {};
      formConfig.fields.forEach(field => {
        initialData[field.name] = "";
      });
      setFormData(initialData);
    }
  }, [formConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const fields = formConfig?.fields || [];

    fields.forEach(field => {
      if (!field.required) return;
      const value = formData[field.name];
      if (!value || !value.toString().trim()) {
        newErrors[field.name] = field.type === "select"
          ? "Seleccione un tipo"
          : `El campo ${field.label.toLowerCase()} es obligatorio`;
      }
      if (field.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field.name] = "Email inválido";
      }
    });

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
    try {
      await ClaimService.sendClaim(formData);
      setSuccess(true);
      const resetData = {};
      formConfig.fields.forEach(field => { resetData[field.name] = ""; });
      setFormData(resetData);
    } catch (error) {
      console.log(formData);
      setSubmitError("Ocurrió un error al enviar el formulario.");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || "",
      onChange: handleChange,
      "aria-invalid": !!errors[field.name],
      className: "px-4 py-2 border rounded-lg"
    };

    return (
      <div key={field.name} className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          {field.label} {field.required && "*"}
        </label>

        {field.type === "select" ? (
          <select {...commonProps}>
            <option value="">Seleccione</option>
            {(formConfig?.claim_types || []).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea {...commonProps} rows={5} />
        ) : (
          <input {...commonProps} type={field.type} />
        )}

        {errors[field.name] && (
          <p className="text-red-500 text-sm">{errors[field.name]}</p>
        )}
      </div>
    );
  };

  if (configLoading) return null;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <Navbar />

      <div className="absolute top-23 left-4 md:top-25 mt-5 md:left-10 z-10">
        <BtnBack />
      </div>

      <div className="p-3 md:w-[70%] pt-20 md:pt-3 max-w-2xl">

        <section className="flex flex-col items-center text-center md:items-start mb-8">
          <Title className="mb-4">{formConfig?.title}</Title>
          <Text className="mb-6">{formConfig?.description}</Text>
          <Text className="mb-6 text-gray-500 italic text-center text-base font-medium">
            {formConfig?.note}
          </Text>
        </section>

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

          {(formConfig?.fields || []).map(field => renderField(field))}

          <input type="text" name="_gotcha" style={{ display: "none" }} />

          <div className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              <Text>{loading ? "Enviando..." : "Enviar reclamo"}</Text>
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Claim;