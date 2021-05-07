import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import CustomInput from "../../components/CustomInput/CustomInput";
import Messages from "../../components/Messages/Messages";
import AdditionalText from "../../components/AdditionalText/AdditionalText";
import "./ChatPage.css";

let socket;

const ChatPage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");

  useEffect(() => {
    // Получение имени и комнаты из поискового запроса
    const { name, room } = queryString.parse(location.search);
    const date = new Date();
    setName(name);
    setRoom(room);

    socket = io("localhost:5000", {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    });
    // Попытка подсоединения к комнате
    socket.emit("joinRoom", { name, room, date }, (error) => {
      if (error) {
        alert(error);
        history.push("/");
      }
    });
    // Отключение сокета при анмаунте компонента
    return () => socket.off();
  }, [location.search, history]);

  useEffect(() => {
    // Добавление нового сообщения в массив "messages"
    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });
    // Получение имен участников комнаты
    socket.on("roomUsers", ({ users }) => {
      setUsers(users);
    });
    return () => socket.off();
  }, [messages]);
  // Отправление написанного сообщения на сервер
  const sendMessage = (event) => {
    event.preventDefault();
    const date = new Date();
    if (message) {
      socket.emit("sendMessage", { message, date }, () => setMessage(""));
    }
  };
  return (
    <div className="pageContainer">
      <AdditionalText room={room} users={users} />
      <div className="chatContainer">
        <InfoPanel room={room} />
        <Messages name={name} messages={messages} />
        <CustomInput
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
