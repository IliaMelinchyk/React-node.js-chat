import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import "./AdditionalText.css";

const AdditionalText = ({ users, room }) => (
  <div className="textContainer">
    <button
      className="textButton"
      onClick={() =>
        navigator.clipboard.writeText(`http://localhost:3000/?join=${room}`)
      }
    >
      Нажми сюда чтобы скопировать ссылку на комнату
    </button>
    {users ? (
      <div className="textOnline">
        <h2 className="textHeader">Онлайн:</h2>
        <ul className="textUl">
          {users.map(({ name }) => (
            <li key={name} className="textLi">
              <GoPrimitiveDot color="lime" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </div>
);

export default AdditionalText;
