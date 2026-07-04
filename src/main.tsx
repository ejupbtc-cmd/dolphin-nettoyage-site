import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminApp from './admin/AdminApp.tsx'
import { SiteDataProvider } from './context/SiteDataContext.tsx'

const { pathname, search } = window.location
const isAdmin = pathname.startsWith('/admin') || new URLSearchParams(search).has('admin')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteDataProvider>
      {isAdmin ? <AdminApp /> : <App />}
    </SiteDataProvider>
  </StrictMode>,
)
