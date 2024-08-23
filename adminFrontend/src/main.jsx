import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AccountProvider from './context/AccountContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AccountProvider>
    <App />
    </AccountProvider>
  </React.StrictMode>,
)
