import { useState, useEffect } from 'react';
import { Text } from '../../components/Typography';
import Button from '../../components/common/Button';
import { ClaimService } from '../../api/services/ClaimService';

export default function ClaimForm({ formConfig, onSuccess, onError }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formConfig?.fields) {
      const initialData = {};
      formConfig.fields.forEach(field => { initialData[field.name] = ""; });
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
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await ClaimService.sendClaim(formData);
      const resetData = {};
      formConfig.fields.forEach(field => { resetData[field.name] = ""; });
      setFormData(resetData);
      onSuccess();
    } catch (error) {
      onError("Ocurrió un error al enviar el formulario.");
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {(formConfig?.fields || []).map(field => renderField(field))}
      <input type="text" name="_gotcha" style={{ display: "none" }} />
      <div className="mt-4">
        <Button type="submit" className="w-full" disabled={loading}>
          <Text>{loading ? "Enviando..." : "Enviar reclamo"}</Text>
        </Button>
      </div>
    </form>
  );
}