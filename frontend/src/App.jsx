import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cud from './pages/cud/Cud'
import CNRT from './pages/cnrt/CNRT'
import Transporte from './pages/transporte/Transporte'
import MapView from './components/Map/MapView'
import Admin from './pages/Admin'
import Dashboard from './pages/admin/Dashboard'
import Agradecimientos from './pages/Agradecimientos'
import Turismo from './pages/turismo/Turismo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/map-test" element={<MapView />} />
        <Route path="/cud" element={<Cud />}/>
        <Route path="/CNRT" element={<CNRT />}/>
        <Route path="/transporte" element={<Transporte />}/>
        <Route path="/turismo" element={<Turismo />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/admin/dashboard" element={<Dashboard />}/>
        <Route path="/agradecimientos" element={<Agradecimientos />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
