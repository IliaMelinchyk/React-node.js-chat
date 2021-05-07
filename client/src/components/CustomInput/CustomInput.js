import React from "react";
import { RiMessage2Line } from "react-icons/ri";
import "./CustomInput.css";

const CustomInput = ({ message, setMessage, sendMessage }) => (
  <form className="inputForm">
    <input
      className="inputMessage"
      type="text"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      placeholder="Введите сообщение"
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button
      className={`sendButton ${
        message === "" ? "sendButtonDeactivated" : null
      }`}
      onClick={(event) => sendMessage(event)}
    >
      <RiMessage2Line className="inputIcon" /> Отправить
    </button>
  </form>
);
export default CustomInput;
