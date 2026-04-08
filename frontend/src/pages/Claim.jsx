/**
 * Claim
 * Responsabilidades:
 * - Renderizar un formulario de reclamos basado en la config del hook `useClaimForm()`
 * - Validar campos requeridos antes de enviar
 * - Enviar el reclamo con `ClaimService.sendClaim(formData)`
 * - Si el usuario está logueado como admin, mostrar también un panel para ver reclamos ya enviados
 */

import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import BtnBack from '../components/common/BtnBack';
import Button from '../components/common/Button';
import { Title, Text } from '../components/Typography';
import { ClaimService } from '../api/services/ClaimService';
import { useClaimForm } from '../hooks/useClaimForm';
import { useAuth } from '../context/AuthContext';


function Claim() {
  const { formConfig, loading: configLoading } = useClaimForm();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showClaims, setShowClaims] = useState(false);
  const [claims, setClaims] = useState([]);
  const [claimsLoading, setClaimsLoading] = useState(false);

  useEffect(() => {
    if (formConfig?.fields) {
      const initialData = {};
      formConfig.fields.forEach(field => {
        initialData[field.name] = "";
      });
      setFormData(initialData);
    }
  }, [formConfig]);

  const handleToggleClaims = async () => {
    if (!showClaims && claims.length === 0) {
      setClaimsLoading(true);
      try {
        const data = await ClaimService.getAll();
        setClaims(data);
      } catch (err) {
        console.error("Error cargando reclamos:", err);
      } finally {
        setClaimsLoading(false);
      }
    }
    setShowClaims(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  //logica para validar que el input del user sea el deseado
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

  //manda la claim a la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setSubmitError(null);
    const validationErrors = validate();

    //si hay algun error, no mando. (logica para ver que el input sea valido)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    //intentamos mandar la claim a la base de datos y enviarle un mail al usuario con su claim
    try {
      await ClaimService.sendClaim(formData);

      //si todo ok, reseteamos el form por si quiere hacer otra claim
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

      <div className="p-3 md:w-[70%] pt-20 md:pt-3 max-w-2xl w-full">

        {isAuthenticated && (
          <div className="mb-6 p-4 bg-white border-l-4 border-blue-600 shadow-sm flex justify-between items-center rounded-r-lg">
            <span className="font-bold text-blue-800">Panel de Administración</span>
            <button
              onClick={handleToggleClaims}
              className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition"
            >
              {showClaims ? "Ocultar reclamos" : "Ver reclamos"}
            </button>
          </div>
        )}

        {showClaims && isAuthenticated && (
          <div className="mb-8 border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-50 px-4 py-3 border-b">
              <span className="font-bold text-blue-800">Reclamos recibidos</span>
            </div>
            {claimsLoading ? (
              <p className="p-4 text-sm text-gray-500">Cargando...</p>
            ) : claims.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No hay reclamos aún.</p>
            ) : (
              <div className="divide-y">
                {claims.map(claim => (
                  <div key={claim.id} className="p-4 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-sm">{claim.full_name}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(claim.created_at).toLocaleDateString("es-AR", {
                          day: "numeric", month: "long", year: "numeric"
                        })}
                      </span>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">{claim.type}</span>
                    <span className="text-xs text-gray-500">{claim.email}</span>
                    {claim.location && <span className="text-xs text-gray-500">📍 {claim.location}</span>}
                    <p className="text-sm text-gray-700 mt-1">{claim.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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