import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Toaster } from 'sonner'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* reducedMotion="user" : respecte prefers-reduced-motion pour toutes les animations de transformation */}
      <MotionConfig reducedMotion="user">
        <App />
        <Toaster position="top-right" richColors closeButton toastOptions={{ style: { borderRadius: 0, fontFamily: 'var(--font-sans)' } }} />
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
