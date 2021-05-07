const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  // Запрет на вход юзера с ником уже присутствующим в комнате
  const userExists = users.find(
    (user) => user.room === room && user.name === name
  );
  if (userExists)
    return { error: "Пользователь с таким именем уже есть в комнате." };
  if (!name || !room) return { error: "Необходимы имя и комната" };
  // Добавление юзера в массив "users"
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const deleteUser = (id) => {
  // Нахождение индекса удаляемого юзера
  const index = users.findIndex((user) => user.id === id);
  // Удаление юзера из массива "users"
  if (index !== -1) return users.splice(index, 1)[0];
};

// Нахождения юзера по его айди в массиве "users"
const getUser = (id) => users.find((user) => user.id === id);
// Нахождение всех юзеров в данных которых присутствует запрашиваемая комната
const getAllUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, deleteUser, getUser, getAllUsersInRoom };
