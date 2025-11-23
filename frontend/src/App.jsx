import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import MapView from './components/Map/MapView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/map-test" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
