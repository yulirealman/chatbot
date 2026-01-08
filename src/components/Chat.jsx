import { useEffect, useRef } from "react";
import { Message } from "./Message.jsx";
export function Chat({ messages }) {
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
