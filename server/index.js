const socketio = require("socket.io");
const router = require("./router");
const http = require("http");
const express = require("express");
const {
  addUser,
  deleteUser,
  getUser,
  getAllUsersInRoom,
} = require("./users.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;

app.use(router);

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ name, room, date }, callback) => {
    // Добавление нового юзера
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    // Отправка сообщения для юзера при входе в комнату
    socket.emit("newMessage", {
      user: " ",
      text: `${user.name}, добро пожаловать в комнату "${user.room}".`,
      date: date,
    });
    // Отправка сообщения для всех юзеров в комнате о том что другой юзер зашел в нее
    socket.broadcast.to(user.room).emit("newMessage", {
      user: " ",
      text: `${user.name} присоединился к чату!`,
      date: date,
    });
    socket.join(user.room);
    // Отправка ников участников комнаты
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getAllUsersInRoom(user.room),
    });
    callback();
  });
  // Принятие написанного юзером сообщения
  socket.on("sendMessage", ({ message, date }, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("newMessage", {
      user: user.name,
      text: message,
      date: date,
    });
    callback();
  });
  //Удаление юзера из массива "users" при отключении юзера из комнаты и отправка сообщения об этом участникам комнаты
  socket.on("disconnect", () => {
    const user = deleteUser(socket.id);
    if (user) {
      date = new Date();
      io.to(user.room).emit("newMessage", {
        user: " ",
        text: `${user.name} покинул комнату.`,
        date: date,
      });
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getAllUsersInRoom(user.room),
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(PORT));
