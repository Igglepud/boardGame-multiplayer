const Player = require("./server/player.js");
const Game = require("./server/game.js");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const duelList = [];
const players = {};
const games = [];
const io = new Server(server, {
  cors: {
    origin: true,
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//games[0] = new Game();

io.on("connection", (socket) => {
  players[socket.id] = new Player(socket.id);
});

server.listen(3031, () => {
  console.log("listening on *:3031");
});

setInterval(() => {}, 1000);
