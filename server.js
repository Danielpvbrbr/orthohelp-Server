const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 21144;
const port2 = process.env.port || 3001;
const mysql = require('./connection');
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const https = require("https");
const fs = require('fs')

require("dotenv-safe").config();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const Auth = require("./src/View/Auth");
const PostChat = require("./src/View/PostChat");
const Msg = require("./src/View/Msg");
const GetChat = require("./src/View/GetChat");
const DeleteChat = require("./src/View/DeleteChat");
const FinishedChat = require("./src/View/FinishedChat");
const GetUsers = require("./src/View/GetUsers");
const Visualized = require("./src/View/Visualized");
const PostUsers = require("./src/View/PostUsers");
const DeleteUsers = require("./src/View/DeleteUsers");
const PostVideos = require("./src/View/PostVideos");
const GetVideos = require("./src/View/GetVideos");
const DeleteVideo = require("./src/View/DeleteVideo");
const AltPassTemporary = require("./src/View/AltPassTemporary");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  },
});

app.get('/', (req, res) => {
  res.send({ response: 'Application running!' }).status(200);
});

app.post('/Auth', (req, res, next) => {
  Auth(req, res, io, mysql);
  GetUsers(io, mysql);
});

app.post('/altPassTemporary', (req, res) => {
  console.log(req.body)
  AltPassTemporary(req, res, io, mysql);
});

app.post('/chat', (req, res) => {
  PostChat(req, res, io, mysql);
  GetChat(io, mysql);
});

app.post('/deleteChat', (req, res) => {
  DeleteChat(req, res, io, mysql);
  GetChat(io, mysql);
});

app.post('/finishedChat', (req, res) => {
  FinishedChat(req, res, io, mysql);
  GetChat(io, mysql);
});

app.post("/visualized", (req, res) => {
  Visualized(req, res, io, mysql);
  GetChat(io, mysql);
});

app.post("/users", (req, res) => {
  PostUsers(req, res, io, mysql);
  GetUsers(io, mysql);
});

app.post("/deleteUsers", (req, res) => {
  DeleteUsers(req, res, io, mysql);
  GetUsers(io, mysql);
});

app.post("/video", (req, res) => {
  PostVideos(req, res, io, mysql);
  GetVideos(io, mysql);
});

app.post('/deleteVideo', (req, res) => {
  DeleteVideo(req, res, io, mysql);
  GetVideos(io, mysql);
});

io.on('connection', (socket) => {
  Msg(socket, mysql);
  GetChat(socket, mysql);
  GetUsers(socket, mysql);
  //GetVideos(socket, mysql);
});

server.listen(port, () => {
  console.log(`running http ${port2} http://localhost:${port}/`);
});

https.createServer({
  cert: fs.readFileSync("src/certificate/code.crt"),
  key: fs.readFileSync("src/certificate/code.key")
}, app).listen(port2, () => console.log(`running https ${port2} https://localhost:3001/`))
