import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './redux/store.js'
import './services/styles/index.css'
import App from './App.jsx'
import Chatbot from './atoms/chatbot/index.jsx'
import FloatingWeatherButton from './atoms/weather/FloatingWeatherButton.jsx'

// Load Sienna Accessibility script
function loadSiennaAccessibility() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js';
  script.async = true;
  document.body.appendChild(script);
}

// Load after initial render (afterInteractive equivalent)
if (document.readyState === 'complete') {
  loadSiennaAccessibility();
} else {
  window.addEventListener('load', loadSiennaAccessibility);
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <Chatbot/>
        <FloatingWeatherButton />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)

const ogUrl = import.meta.env.VITE_DOMAIN_URL || "https://default.site";

const metaOgUrl = document.querySelector('meta[property="og:url"]');

if (metaOgUrl) {
  metaOgUrl.setAttribute("content", ogUrl);
}
