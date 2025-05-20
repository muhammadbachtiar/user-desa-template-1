import { BubbleChat } from 'flowise-embed-react'

const Chatbot = () => {
  console.log(import.meta.env.VITE_CHATBOT_ID, import.meta.env.VITE_CHATBOT_BASE_URL, import.meta.env.VITE_CHATBOT_TOKEN)
    return (
        <BubbleChat
            chatflowid={import.meta.env.VITE_CHATBOT_ID}
            apiHost={import.meta.env.VITE_CHATBOT_BASE_URL}
             theme={{    
                button: {
                    backgroundColor: '#3B81F6',
                    right: 20,
                    bottom: 70,
                    size: 48,
                    dragAndDrop: true,
                    iconColor: 'white',
                    autoWindowOpen: {
                        autoOpen: true,
                        openDelay: 2,
                        autoOpenOnMobile: false
                    }
                },
                disclaimer: {
                    title: 'Disclaimer',
                    message: "By using this chatbot, you agree to the <a target=\"_blank\" href=\"https://flowiseai.com/terms\">Terms & Condition</a>",
                    textColor: 'black',
                    buttonColor: '#3b82f6',
                    buttonText: 'Start Chatting',
                    buttonTextColor: 'white',
                    blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backgroundColor: 'white'
                },
                customCSS: ``,
                chatWindow: {
                    showTitle: true,
                    showAgentMessages: true,
                    title: 'Aruna - Asisten Virtual',
                    titleAvatarSrc: '/aruna-profile.png',
                    welcomeMessage: 'Hallo saya aruna, asisten virtual anda. Silahkan bertanya kepada saya.',
                    errorMessage: 'This is a custom error message',
                    backgroundColor: '#ffffff',
                    backgroundImage: 'enter image path or link',
                    height: 600,
                    width: 400,
                    fontSize: 16,
                    starterPrompts: [
                        "Apa yang bisa kamu lakukan?",
                        "Kamu siapa?",
                    ],
                    starterPromptFontSize: 15,
                    clearChatOnReload: false,
                    sourceDocsTitle: 'Sources:',
                    renderHTML: true,
                    botMessage: {
                        backgroundColor: '#f7f8ff',
                        textColor: '#303235',
                        showAvatar: true,
                        avatarSrc: '/aruna-profile.png'
                    },
                    userMessage: {
                        backgroundColor: '#3B81F6',
                        textColor: '#ffffff',
                        showAvatar: true,
                        avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
                    },
                    textInput: {
                        placeholder: 'Apa pertanyaan anda?',
                        backgroundColor: '#ffffff',
                        textColor: '#303235',
                        sendButtonColor: '#3B81F6',
                        maxChars: 50,
                        maxCharsWarningMessage: 'Batas karakter 50',
                        autoFocus: true,
                        sendMessageSound: true,
                        sendSoundLocation: 'send_message.mp3',
                        receiveMessageSound: true,
                        receiveSoundLocation: 'receive_message.mp3'
                    },
                    feedback: {
                        color: '#303235'
                    },
                    dateTimeToggle: {
                        date: true,
                        time: true
                    },
                    footer: {
                        textColor: '#303235',
                        text: 'Powered by',
                        company: 'Flowise',
                        companyLink: 'https://flowiseai.com'
                    }
                }
            }}
        />
    )
}

export default Chatbot;
