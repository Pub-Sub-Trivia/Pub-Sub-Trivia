const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const apiController = require("./controllers/apiController");
const gameController = require("./controllers/gameController");
const socketController = require("./controllers/socketController");

const PORT = 3000;

app.use(express.json());

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.status(200).sendFile("../client/index.html");
});

app.get(
  "/api/newgame",
  apiController.buildQuery,
  apiController.getQuestions,
  gameController.createLobby,
  (req, res) => {
    console.log(res.locals.gameID);
    res.status(200).send({ gameID: res.locals.gameID });
  },
);

// Global error handler for client-side errors
app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

// Global error handler for server-side errors
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).send(errorObj.message);
});

io.on("connection", (socket) => {
  socketController.initGame(io, socket);
});

http.listen(PORT, () => {
  console.log("Geodude rocking on port " + PORT);
});
