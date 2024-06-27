const express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var clients = 0;
const path = require("path");
const { dirname } = require("path");

console.log("dirname", __dirname);

app.use(express.static("public"));
app.use("/public/soundFiles", express.static(__dirname + "/Sound"));
app.use("/public/main.js", express.static(__dirname + "/public/main.js"));
app.get("/", function (req, res) {
  console.log("main page reached");
  res.sendFile("/public/index.html");
});

app.get("/public/main.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/main.js"));
});

io.on("connection", function (socket) {
  console.log("socket connected");

  //socket.broadcast.emit("hello", "world");
  socket.on("playOrPauseTrack", () => {
    io.emit("playOrPauseTrack");
  });

  socket.on("playTrack", () => {
    io.emit("playTrack");
  });

  socket.on("pauseTrack", () => {
    io.emit("pauseTrack");
  });

  socket.on("nextTrack", () => {
    io.emit("nextTrack");
  });

  socket.on("previousTrack", () => {
    io.emit("previousTrack");
  });

  socket.on("seekTo", () => {
    io.emit("seekTo");
  });

  socket.on("seekUpdate", () => {
    io.emit("seekUpdate");
  });

  socket.on("loadTrack", (trackIndex) => {
    io.emit("loadTrack", trackIndex);
  });

  socket.on("disconnect", function () {
    clients--;
    console.log("socket disconnected");
  });
});

const PORT = process.env.PORT || 3000;

http.listen(3000, function () {
  console.log(`listening on ${PORT}`);
});
