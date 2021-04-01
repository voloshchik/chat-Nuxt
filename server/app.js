const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

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
    cb({ userId: socket.id });
    socket.emit("newMessage", m("admin", `Добро пожаловать ${data.name}.`));
    socket.emit("newMessage", m("test", `Добро пожаловать .`));
    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `Пользователь ${data.name} зашел`));
  });

  socket.on("createMessage", data => {
    console.log(data);
    setTimeout(() => {
      socket.emit("newMessage", {
        text: data.text + "SERVER"
      });
    });
  });
  console.log("IO Connected");
});

module.exports = {
  app,
  server
};
