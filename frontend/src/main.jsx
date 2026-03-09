import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css';
import App from './App.jsx'
import { OfficeService } from './api/services/OfficeService.js'
window.OfficeService = OfficeService

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
