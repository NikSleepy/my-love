import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import HeartBurstProvider from './components/HeartBurstProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeartBurstProvider>
      <App />
    </HeartBurstProvider>
  </StrictMode>,
)
