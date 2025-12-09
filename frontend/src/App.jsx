import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cud from './pages/cud/Cud'
import CNRT from './pages/cnrt/CNRT'
import Transporte from './pages/transporte/Transporte'
import MapView from './components/Map/MapView'
import Admin from './pages/Admin'
import Agradecimientos from './pages/Agradecimientos'
import { AccessibilityProvider } from './accessibilityMode/AccessibilityMode'

function App() {
  return (
    <AccessibilityProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/map-test" element={<MapView />} />
        <Route path="/cud" element={<Cud />}/>
        <Route path="/CNRT" element={<CNRT />}/>
        <Route path="/transporte" element={<Transporte />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/agradecimientos" element={<Agradecimientos />}/>
      </Routes>
    </BrowserRouter>
    </AccessibilityProvider>
  )
}

export default App
