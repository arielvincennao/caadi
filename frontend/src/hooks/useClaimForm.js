import { useState, useEffect } from "react";
import { ClaimFormService } from "../api/services/ClaimFormService";

export function useClaimForm() {
  const [formConfig, setFormConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const config = await ClaimFormService.get();
        setFormConfig(config);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  return { formConfig, loading, error };
}