import { useState, useEffect} from 'react'
import { supabase } from '../../db/supabaseClient'
import { useNavigate } from "react-router-dom";

import Logo from '../components/common/Logo'
import Button from '../components/common/Button'
import { Text, Title } from '../components/Typography'

function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

useEffect(() => {
   supabase.auth.signOut();
}, []);
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenciales incorrectas");
      setIsLoading(false);
      return;
    }

    //TODO esto aca deberia llevarnos ya al menu para editar 
    navigate("/admin/dashboard");
  } catch (e) {
    setError("Error inesperado al iniciar sesión");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo 
            src="/assets/logo-caadi.svg" 
            alt="Logo CAADI" 
            className="mb-4 max-w-xs w-32 h-32 md:w-40 md:h-40" 
          />
          <Title className="text-3xl md:text-4xl mb-2">Administración</Title>
          <Text className="text-gray-600">Inicia sesión para continuar</Text>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F313F] focus:border-transparent outline-none transition-all"
              placeholder="admin@caadi.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F313F] focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <Text className="text-sm">{error}</Text>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
            >
              <Text>{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}</Text>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Admin

