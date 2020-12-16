let io;
let gameSocket;
const { response } = require("express");
const { config } = require("webpack");
// If this doesn't work... try switching these to vars

const Game = require("../game.js")

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
    gameSocket.emit('connected', { message: "You are connected!" });

    gameSocket.on('createNewGame', createNewGame);
    gameSocket.on('joinGame', joinGame);
    gameSocket.on('leaveGame', leaveGame)

    gameSocket.on('startGame', startGame);
    // gameSocket.on('nextQuestion', nextQuestion);


    // Player Events
    
    gameSocket.on('answerQuestion', answerQuestion);
    // gameSocket.on('restartGame', restartGame);
}

/**
 * The 'START' button was clicked and 'hostCreateNewGame' event occurred.
 */ 
function createNewGame(data) {
  //Destructuring playerName and game settings from req
  const { config, playerName } = data;
    const socketID = this.id;
    
  // Retrieve questions from the API based on the specified configuration
  const questions = fetchQuestions(config);

  //Create a new game state and unique ID for Socket.IO Roon
  const gameState = new Game(this.id, playerName, questions);
  const gameID = gameState.getID();
  activeGames[gameID] = gameState;

  // Return the Room ID and the socket ID to the browser client
  this.emit("newGameCreated", { gameID, socketID });

  // Join the Room and wait for the players
  this.join(gameID.toString());
};


/**
 * A player clicked the 'START GAME' button.
 * Attempt to connect them to the room that matches the gameId entered by the player.
 * @param data Contains data entered via player's input - playerName and gameId.
 */
function joinGame(data) {
  const { gameID, playerName } = data;
  const socketID = this.id;
  
  // Look up the room ID in the Socket.IO manager object.
  const room = gameSocket.manager.rooms["/" + gameID];

  // If the room exists...
  if (room != undefined) {

    // Join the room
    this.join(gameID);

    //Update game state
    activeGames[gameID].addPlayer(socketID, playerName)

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(gameID).emit("playerJoinedRoom", { gameID, playerName, socketID });
  } else {
    // Otherwise, send an error message back to the player.
    this.emit("error", { message: "This room does not exist." });
  }
}

/*
 * The Countdown has finished, and the game begins!
 * @param gameId The game ID / room ID
 */
function startGame(gameId) {
  var sock = this;
    var data = {
        mySocketId: sock.id,
        gameId: gameId
    };
    // Emit a beginNewGame signal to all clients connected to the game room
    io.sockets.in(data.gameId).emit('beginNewGame', data);
    console.log('Game Started.');
    // Send first question
};

/**
 * A player answered correctly. Time for the next word.
 * @param data Sent from the client. Contains the current round and gameId (room)
 */
function nextQuestion(data) {
    if (data.round < wordPool.length) {
        // Send a new set of words back to the host and players.
        sendWord(data.round, data.gameId);
    } else {
        // If the current round exceeds the number of words, send the 'gameOver' event.
        io.sockets.in(data.gameId).emit('gameOver', data);
    }
}

/**
 * A player has tapped a word in the word list.
 * @param data gameId
 */
function answerQuestion(data) {
    // console.log('Player ID: ' + data.playerId + ' answered a question with: ' + data.answer);

    // The player's answer is attached to the data object.
    // Emit an event with the answer so it can be checked by the 'Host'
    io.sockets.in(data.gameId).emit('hostCheckAnswer', data);
}

/**
 * The game is over, and a player has clicked a button to restart the game.
 * @param data
 */
function restartGame(data) {
    // console.log('Player: ' + data.playerName + ' ready for new game.');

    // Emit the player's data back to the clients in the game room.
    data.playerId = this.id;
    io.sockets.in(data.gameId).emit('playerJoinedRoom', data);
}

/* *************************
   *                       *
   *      GAME LOGIC       *
   *                       *
   ************************* */

/**
 * Get a word for the host, and a list of words for the player.
 *
 * @param wordPoolIndex
 * @param gameId The room identifier
 */
function sendWord(wordPoolIndex, gameId) {
    var data = getWordData(wordPoolIndex);
    io.sockets.in(gameId).emit('newWordData', data);
}

/**
 * This function does all the work of getting a new words from the pile
 * and organizing the data to be sent back to the clients.
 *
 * @param i The index of the wordPool.
 * @returns {{round: *, word: *, answer: *, list: Array}}
 */
function getWordData(i) {
    // Randomize the order of the available words.
    // The first element in the randomized array will be displayed on the host screen.
    // The second element will be hidden in a list of decoys as the correct answer
    var words = shuffle(wordPool[i].words);

    // Randomize the order of the decoy words and choose the first 5
    var decoys = shuffle(wordPool[i].decoys).slice(0, 5);

    // Pick a random spot in the decoy list to put the correct answer
    var rnd = Math.floor(Math.random() * 5);
    decoys.splice(rnd, 0, words[1]);

    // Package the words into a single object.
    var wordData = {
        round: i,
        word: words[0],   // Displayed Word
        answer: words[1], // Correct Answer
        list: decoys      // Word list for player (decoys and answer)
    };

    return wordData;
}

/*
 * Javascript implementation of Fisher-Yates shuffle algorithm
 * http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
 */
function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}