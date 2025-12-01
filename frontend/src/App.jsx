import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cud from './pages/cud/Cud'
import MapView from './components/Map/MapView'
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
      </Routes>
    </BrowserRouter>
    </AccessibilityProvider>
  )
}

export default App
