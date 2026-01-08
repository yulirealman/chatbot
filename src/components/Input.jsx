import { useState} from 'react'
import "./css/Input.css";
export function Input({ messages, setMessages, bot }) {
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