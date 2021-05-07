import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";

const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const Message = ({ message: { user, text, date }, name }) => {
  const formattedDate = new Intl.DateTimeFormat("ru-RU", options).format(
    Date.parse(date)
  );
  const trimmedName = name.trim().toLowerCase();
  let byCurrentUser = false;
  // Проверка на то, является ли полученное сообщение сообщением данного юзера
  if (user === trimmedName) {
    byCurrentUser = true;
  }
  return byCurrentUser ? (
    <div className="messageContainer messageJustifyEnd">
      <p className="messageInfo messagePr-10">
        <span>{trimmedName}</span>
        <span>{formattedDate}</span>
      </p>
      <div className="messageBox messageBackgroundBrown">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer messageJustifyStart">
      <div className="messageBox messageBackgroundGreen">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="messageInfo messagePl-10">
        <span>{user}</span>
        <span>{formattedDate}</span>
      </p>
    </div>
  );
};
export default Message;
