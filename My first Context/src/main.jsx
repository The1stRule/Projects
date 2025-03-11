import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import "./index.css"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
