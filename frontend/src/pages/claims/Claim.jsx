import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import BtnBack from '../../components/common/BtnBack';
import { Title, Text } from '../../components/Typography';
import { ClaimService } from '../../api/services/ClaimService';
import { useClaimForm } from '../../hooks/useClaimForm';
import { useAuth } from '../../context/AuthContext';
import ClaimForm from './ClaimForm';
import ClaimList from './ClaimList';
import ClaimFormEditor from './ClaimFormEditor';

function Claim() {
  const { formConfig, loading: configLoading, setFormConfig } = useClaimForm();
  const { isAuthenticated } = useAuth();
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showClaims, setShowClaims] = useState(false);
  const [claims, setClaims] = useState([]);
  const [claimsLoading, setClaimsLoading] = useState(false);

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

  if (configLoading) return null;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="absolute top-23 left-4 md:top-25 mt-5 md:left-10 z-10">
        <BtnBack />
      </div>

      <div className="p-3 md:w-[70%] pt-20 md:pt-3 max-w-2xl w-full">

        {isAuthenticated && (
          <ClaimFormEditor
            formConfig={formConfig}
            onUpdate={(updatedConfig) => setFormConfig(updatedConfig)}
          />
        )}

        {isAuthenticated && (
          <div className="mb-6">
            <button
              onClick={handleToggleClaims}
              className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition"
            >
              {showClaims ? "Ocultar reclamos" : "Ver reclamos"}
            </button>
          </div>
        )}

        {showClaims && isAuthenticated && (
          <ClaimList claims={claims} loading={claimsLoading} />
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

        <ClaimForm
          formConfig={formConfig}
          onSuccess={() => { setSuccess(true); setSubmitError(null); }}
          onError={(msg) => { setSubmitError(msg); setSuccess(false); }}
        />

      </div>
    </div>
  );
}

export default Claim;