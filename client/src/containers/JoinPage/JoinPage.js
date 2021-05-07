import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import "./JoinPage.css";

const JoinPage = ({ location }) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  // Проверка на то, является ли адрес ссылкой на комнату
  useEffect(() => {
    const { join } = queryString.parse(location.search);
    if (join) {
      setRoom(join);
      setIsJoining(true);
    }
  }, [location.search]);

  return (
    <div className="joinContainer">
      <div className="joinForm">
        <div>
          <input
            className="joinInput"
            type="text"
            placeholder="Введите имя"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        {!isJoining ? (
          <div>
            <input
              className="joinInput"
              type="text"
              placeholder="Введите название комнаты"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
        ) : null}
        <Link
          to={`/chat?name=${name}&room=${room}`}
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
        >
          <button
            className={`joinButton ${
              !name || !room ? "joinButtonDeactivated" : null
            }`}
            type="submit"
          >
            Войти
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinPage;
