import robot_avatar from '@/assets/robot.png'
import user_avatar from '@/assets/user.png'
export function Message({ message, sender }) {
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
