import { useState, useEffect } from "react";
import { supabase } from "../db/supabaseClient";

export default function AdminWrapper({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error validando admin:", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) return <>{children(false)}</>;

  return <>{children(isAdmin)}</>;
}