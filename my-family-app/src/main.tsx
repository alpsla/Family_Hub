// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const mountApp = () => {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Failed to find the root element')
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

// Ensure the DOM is fully loaded before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp)
} else {
  mountApp()
}