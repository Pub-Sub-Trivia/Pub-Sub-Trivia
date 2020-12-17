let io;
let gameSocket;
const axios = require("axios");
const { response } = require("express");
const { config } = require("webpack");
// If this doesn't work... try switching these to vars

const Game = require("../game.js");

// Used to store game state for any active games
const activeGames = {};

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGame = function (sio, socket) {
  io = sio;
  gameSocket = socket;
  gameSocket.emit("connected", { message: "You are connected!" });

  //Game Setup Events
  gameSocket.on("createNewGame", createNewGame);
  gameSocket.on("joinGame", joinGame);
  gameSocket.on("startGame", nextQuestion);

  //Question Control Events
  gameSocket.on("answerQuestion", answerQuestion);
  gameSocket.on("nextQuestion", nextQuestion);

  // Player Events
  gameSocket.on("disconnect", leaveGame);

  // gameSocket.on('restartGame', restartGame);
};

/**
 * The 'START' button was clicked and 'hostCreateNewGame' event occurred.
 */
function createNewGame(data) {
  //Destructuring playerName and game settings from req
  const { config, playerName } = data;
  const socketID = this.id;
  // Retrieve questions from the API based on the specified configuration
  const query = buildQuery(config);
  axios.get(query)
    .then((response) => {
      const questions = response.data.results;
      //Create a new game state and unique ID for Socket.IO Roon
      const gameState = new Game(this.id, playerName, questions);
      const gameID = gameState.getID();
      activeGames[gameID] = gameState;
      // Return the Room ID and the socket ID to the browser client
      this.emit("newGameCreated", { socketID, gameID });
      // Join the Room and wait for the players
      this.join(gameID.toString());
    })
    .catch((error) => {
      // Emit an error if aquestions could not be retrieved from the API
      this.emit("error", { message: "Game could not be created" });
    });
}

/**
 * A player clicked the 'START GAME' button.
 * Attempt to connect them to the room that matches the gameId entered by the player.
 * @param data Contains data entered via player's input - playerName and gameId.
 */

function joinGame(data) {
  const { gameID, playerName } = data;
  const socketID = this.id;

  // Look up the room ID in the Socket.IO manager object.
  const room = activeGames[gameID];

  // If the room exists...
  if (room != undefined) {
    // Join the room
    this.join(gameID);

    //Update game state
    activeGames[gameID].addPlayer(socketID, playerName);

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(gameID).emit(
      "playerJoinedRoom",
      { socketID, gameID, playerName },
    );
  } else {
    // Otherwise, send an error message back to the player.
    this.emit("error", { message: "This room does not exist." });
  }
}

/**
 * Send a new question to all players
 * @param data Sent from the client. Contains the current round and gameId (room)
 */
function nextQuestion(data) {
  const { gameID } = data;
  const socketID = this.id;
  console.log(gameID);
  if (activeGames[gameID].isGameOver()) {
    // If the all questions have been answered, send a game over signal with the final scores included
    const scores = activeGames[gameID].getScores();
    io.sockets.in(gameID).emit("gameOver", { socketID, gameID, scores });

    // delete the game from our active games list
  } else {
    // Send a new question back to the players
    const question = activeGames[gameID].getCurrQuestion();
    io.sockets.in(gameID).emit("newQuestion", { socketID, gameID, question });
  }
}

/**
 * A player has chosen an answer from the available options
 * @param data gameId
 */
function answerQuestion(data) {
  console.log(data);
  // console.log('Player ID: ' + data.playerId + ' answered a question with: ' + data.answer);
  const { gameID, answer } = data;
  const socketID = this.id;

  activeGames[gameID].checkPlayerAnswer(socketID, answer);
  const everyoneHasAnswered = activeGames[gameID].everyoneHasAnswered();
  if (everyoneHasAnswered) {
    // Transition to the next round
    activeGames[gameID].nextRound();
  }
  // Send the current scores to everybody
  const scores = activeGames[gameID].getScores();
  // io.sockets.in(gameID).emit(
  io.sockets.emit(
    "currentScores",
    { socketID, gameID, scores, everyoneHasAnswered },
  );
}

function leaveGame(data) {
  const { gameID, playerName } = data;
  const socketID = this.id;
  // activeGames[gameID].removePlayer(socketID);
  io.sockets.in(gameID).emit(
    "playerLeftRoom",
    { socketID, gameID, playerName },
  );
}

const buildQuery = (config) => {
  const { amount, category, difficulty } = config;
  let URL = `https://opentdb.com/api.php?amount=${amount}`;
  if (category) {
    URL += `&category=${category}`;
  }
  if (difficulty) {
    URL += `&difficulty=${difficulty}`;
  }
  URL += `&type=multiple`;
  return URL;
};
