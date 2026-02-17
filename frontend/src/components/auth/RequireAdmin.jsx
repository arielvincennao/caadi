import { supabase } from "../../../db/supabaseClient";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ADMIN_EMAIL = "caadi3627@gmail.com";

export default function RequireAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return null;

  if (!isAdmin) return <Navigate to="/admin" replace />;

  return children;
}
