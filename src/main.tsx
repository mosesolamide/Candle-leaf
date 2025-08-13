import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './context/AuthContext'
import Router from './Router'
import GlobalAlert from './component/GlobalAlert'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <GlobalAlert />
      <Router />
    </AuthContextProvider>
  </StrictMode>,
)

