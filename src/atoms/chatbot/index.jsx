import '@n8n/chat/style.css';
import './chatbot.css'
import { createChat } from '@n8n/chat';
import { useEffect } from 'react';

const Chatbot = () => {
  const base64 = btoa(
    `${import.meta.env.VITE_LABAHSA_CHATBOT_USERNAME}:${import.meta.env.VITE_LABAHSA_CHATBOT_PASSWORD}`,
  )

  useEffect(() => {
    createChat({
      webhookUrl: `${import.meta.env.VITE_LABAHSA_CHATBOT_BASE_URL}`,
      webhookConfig: {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64}`,
          "Content-Type": "application/json",
        },
      },
      initialMessages: ["Hi, saya Aruna. Ada yang bisa saya bantu?"],
      i18n: {
        en: {
          title: "Aruna",
          subtitle: "",
          footer: "",
          getStarted: "Percakapan baru",
          inputPlaceholder: "Ketik pertanyaan anda disini...",
          closeButtonTooltip: "",
        },
      },
    })

    setTimeout(() => {
      const chatHeading = document.querySelector(".chat-heading")
      if (chatHeading) {
        chatHeading.innerHTML = ""

        const profileImg = document.createElement("img")
        profileImg.src = "/aruna-profile.png"
        profileImg.alt = "Aruna"
        profileImg.className = "chat-profile-img"

        const title = document.createElement("div")
        title.className = "chat-title-container"

        const h1 = document.createElement("h1")
        h1.textContent = "Aruna"

        const subtitle = document.createElement("p")
        subtitle.className = "chat-subtitle"
        subtitle.textContent = "Asisten AI"

        title.appendChild(h1)
        title.appendChild(subtitle)

        chatHeading.appendChild(profileImg)
        chatHeading.appendChild(title)
      }
    }, 500) 
  }, [base64])

  return <div></div>
}

export default Chatbot