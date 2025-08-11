import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './context/AuthContext'
import Router from './Router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </StrictMode>,
)

