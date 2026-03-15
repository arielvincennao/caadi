import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import MapView from './components/map/MapView'
import Admin from './pages/admin/Admin.jsx'
import Dashboard from './pages/admin/Dashboard'
import Agradecimientos from './pages/Agradecimientos'
import DynamicSection from './pages/DynamicSection.jsx'
import Claim from './pages/Claim.jsx'
import AddSection from './pages/AddSection.jsx'
import { PrivateRoute, AuthProvider} from './context/AuthContext.jsx'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/mapa" element={<MapView />} />
        <Route path="/seccion/:slug" element={<DynamicSection />} />
        <Route path="/agradecimientos" element={<Agradecimientos />} />
        <Route path="/reclamos" element={<Claim />} />
        <Route path="/add-seccion" element={<AddSection />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path="/admin/oficinas" element={<PrivateRoute><Oficinas /></PrivateRoute>} />
        <Route path="/admin/oficinas/nueva" element={<PrivateRoute><FormularioOficina /></PrivateRoute>} />
        <Route path="/admin/oficinas/editar/:id" element={<PrivateRoute><FormularioOficina /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App
