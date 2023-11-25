import React from "react";
import Input from "../Inputs";
import socket from "../../services/socket";
import { getLocalStorage } from "../../helpers/localstorage";

type Props = {
  selectedUser: any;
  connectedUsers: any;
};

const ChatWindow = (props: Props) => {
  const [messages, setMessages] = React.useState<any>([]);
  const [messageInput, setMessageInput] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userEmail = getLocalStorage("user").email;
    if (props.selectedUser) {
      const data = {
        fromEmail: userEmail,
        toEmail: props.selectedUser.email,
        touserID: props.selectedUser.key,
        message: messageInput,
      };
      socket.emit("private message", data);
      setMessages((messages: any) => [
        ...messages,
        {
          toUser: props.selectedUser.email,
          message: messageInput,
          fromSelf: true,
        },
      ]);
    }
    setMessageInput("");
  };

  const showMessages = messages.map((message, index) => {
    if (
      message.fromSelf === true &&
      message.toUser === props.selectedUser.email
    )
      return (
        <div
          key={index}
          style={{ textAlign: "right" }}
          className='message-ribbon'
        >
          {message.message}
        </div>
      );
    if (
      message.fromSelf === false &&
      message.fromUser === props.selectedUser.email
    )
      return (
        <div
          key={index}
          style={{ textAlign: "left" }}
          className='message-ribbon'
        >
          {message.message}
        </div>
      );
  });

  socket.on("private message", ({ message, from }) => {
    let newMessages = {};
    for (let i = 0; i < props.connectedUsers.length; i++) {
      const user = props.connectedUsers[i];
      if (user.email === from) {
        newMessages = {
          fromUser: props.connectedUsers[i].email,
          message,
          fromSelf: false,
        };
        const messagesList = [...messages, newMessages];
        setMessages(messagesList);
      }
    }
  });

  React.useEffect(() => {
    console.log("messagelist", messages);
  }, [messages]);

  return (
    <div className='flex flex-col'>
      {props.selectedUser.email}
      <div className='message-container'>{showMessages}</div>
      {props.selectedUser.email && (
        <form action='' onSubmit={onSubmit}>
          <Input
            id='message'
            value={messageInput}
            onChange={handleChange}
            name='message'
            label={""}
            placeholder='input messages'
          />
        </form>
      )}
    </div>
  );
};

export default ChatWindow;
