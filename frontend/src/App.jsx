import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cud from './pages/cud/Cud'
import CNRT from './pages/cnrt/CNRT'
import MapView from './components/Map/MapView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/map-test" element={<MapView />} />
        <Route path="/cud" element={<Cud />}/>
        <Route path="/CNRT" element={<CNRT />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
