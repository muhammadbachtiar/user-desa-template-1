import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './services/styles/index.css'
import App from './App.jsx'
import Chatbot from './atoms/chatbot/index.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Chatbot/>
    </Provider>
  </StrictMode>,
)

const tittle = import.meta.env.VITE_VILLAGE_NAME || "Website Desa";
const ogUrl = import.meta.env.VITE_DOMAIN_URL || "https://default.site";

document.title = tittle

const metaOgUrl = document.querySelector('meta[property="og:url"]');
const metaOgTittle = document.querySelector('meta[property="og:title"]');

if (metaOgUrl) {
  metaOgUrl.setAttribute("content", ogUrl);
}

if (metaOgTittle) {
  metaOgTittle.setAttribute("content", tittle);
}

