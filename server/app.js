const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.emit("newMessage", {
    text: "WHAT"
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
