import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAdmin from "./components/auth/RequireAdmin.jsx"
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cud from './pages/cud/Cud'
import CNRT from './pages/cnrt/CNRT'
import Transporte from './pages/transporte/Transporte'
import MapView from './components/map/MapView'
import Admin from './pages/Admin'
import Dashboard from './pages/admin/Dashboard'
import Agradecimientos from './pages/Agradecimientos'
import Turismo from './pages/turismo/Turismo'
import Beneficios from './pages/beneficios/Beneficios'
import Reclamos from './pages/Reclamos'
import Cultura from './pages/cultura/Cultura.jsx'
import Centrosdia from './pages/centrosdia/Centrosdia.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/cud" element={<Cud />} />
        <Route path="/CNRT" element={<CNRT />} />
        <Route path="/transporte" element={<Transporte />} />
        <Route path="/turismo" element={<Turismo />} />
        <Route path="/beneficios" element={<Beneficios />} />
        <Route path="/cultura" element={<Cultura />} />
        <Route path="/centrosdia" element={<Centrosdia />} />
        <Route path="/reclamos" element={<Reclamos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<RequireAdmin><Dashboard /></RequireAdmin>}/>
        <Route path="/agradecimientos" element={<Agradecimientos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
