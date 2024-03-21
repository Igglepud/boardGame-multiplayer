const player = require('./server/player.js');
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const duelList = [];
const players = {};
const io = new Server(server, {
  cors: {
    origin: true,
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  players[socket.id] = {};
});

server.listen(3031, () => {
  console.log("listening on *:3031");
});

setInterval(() => {
  let remove = false;
  duelList.forEach((duel, index) => {
    if (duel.heartbeat() == -1) {
      remove = index;
    }
  });
  if (remove) {
    duelList[remove] = null;

    duelList.splice(remove, 1);
  }
}, 1000);
