const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = require("./users")();

const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  socket.emit("newMessage", {
    text: "WHAT"
  });

  socket.on("userJoned", (data, cb) => {
    if (!data.room && !data.name) {
      return cb("Данные не коректные");
    }
    socket.join(data.room);

    users.remove(socket.id);

    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });

    cb({ userId: socket.id });
    io.to(data.room).emit("updateUsers", users.getByRoom(data.room));
    socket.emit("newMessage", m("admin", `Добро пожаловать ${data.name}.`));

    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `Пользователь ${data.name} зашел`));
  });

  socket.on("createMessage", (data, cb) => {
    if (!data.text) {
      return cb("Teкс не может быть пустым");
    }
    const user = users.get(data.id);

    if (user) {
      io.to(user.room).emit("newMessage", m(user.name, data.text, data.id));
    }
    cb();
  });

  socket.on("userLeft", (id, cb) => {
    const user = users.remove(id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getByroom);
      io.to(user.room).emit(
        "newMessage",
        m("admin", `Пользователь  ${user.name} вышел`)
      );
    }
    cb();
  });

  socket.on("disconnect", () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getByroom);
      io.to(user.room).emit(
        "newMessage",
        m("admin", `Пользователь  ${user.name} вышел`)
      );
    }
  });

  console.log("IO Connected");
});

module.exports = {
  app,
  server
};
