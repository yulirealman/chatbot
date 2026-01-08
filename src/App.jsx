import { useState, useRef, useEffect } from 'react'
import { createAgent } from './bot'
import robot_avatar from './assets/robot.png'
import user_avatar from './assets/user.png'
import './App.css'


    function Input({ messages, setMessages, bot }) {
      const [input, setInput] = useState("");

      function saveInput(event) {
        setInput(event.target.value);
      }

      function sendMessage() {
        const updatedMessages = [
          //before adding new message,
          //create a copy of the current state
          ...messages,
          //then add the new message
          {
            message: input,
            sender: "user",
            id: crypto.randomUUID(),
          }];
        setMessages(updatedMessages);


        const reply = bot.reply(input);
        setMessages([
          ...updatedMessages,
          {
            message: reply,
            sender: "robot",
            id: crypto.randomUUID(),
          }
        ])
        setInput("");
      }


      return (
        <div className="input-container">
          <input type="text" placeholder="Type a message..." size="50"
            onChange={saveInput}
            value={input}
            className="input"
          />
          <button onClick={sendMessage}
            className="send-button"
          >Send</button>
        </div>
      );
    }
    function Message({ message, sender }) {
      // const message = props.message;
      // const {sender} = props;
      // if (sender === 'robot') {
      //   return (
      //     <div>
      //       <img src="robot.png" alt="" height="50" width="50" />
      //       {message}

      //     </div>
      //   );
      // } 
      return (
        <div className={sender === "robot" ? "robot-message" : "user-message"}>
          {/* same as if sender === "robot" then return robot image else return user image */}
          {sender === "robot" && <img src={robot_avatar} alt="" height="50" width="50" />}
          <div className="message-content">
            {message}
          </div>
          {sender === "user" && <img src={user_avatar} alt="" height="50" width="50" />}
        </div>
      );
    }

    function Chat({ messages }) {
      const chatContainerRef = useRef(null);
      //React will run this function
      // - after component is created
      // - every time the component is updated
      useEffect(() => {
        const containerElem = chatContainerRef.current;
        if (containerElem) {
          containerElem.scrollTop = containerElem.scrollHeight;
        }
      }, [messages]);



      return (
        <div className="chat-container"
        ref={chatContainerRef}>
          {
            messages.map(
              (message) => {
                return <Message message={message.message} sender={message.sender} key={message.id} />
              }
            )
          }
        </div>
      )

    }

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
