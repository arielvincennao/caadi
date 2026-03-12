import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css';
import App from './App.jsx'
import { ClaimFormService } from './api/services/ClaimFormService'
import { supabase } from '../db/supabaseClient.js'
window.supabase = supabase
window.ClaimFormService = ClaimFormService


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
