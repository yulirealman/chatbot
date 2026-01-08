import { useState} from 'react'
import { createAgent } from './bot'
import {Chat} from './components/Chat'
import {Input} from './components/Input'
import './App.css'




function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am a chatbot!",
      sender: "robot",
      id: 1
    },
    {
      message: "I am user!",
      sender: "user",
      id: 2
    },
  ])
  const bot = createAgent();

  return (
    <div className="app-container">
      <Chat messages={messages} />
      <Input messages={messages} setMessages={setMessages} bot={bot} />

    </div>
  )
}

export default App
