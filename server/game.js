class Game {
  constructor(socketID, creatorName, questions) {
    this.gameID = Math.floor(Math.random() * 10000);
    this.currentRound = 0;
    this.playerCount = 0;
    this.answersRecieved = 0;
    this.players = {};
    this.questions = questions;
    this.addPlayer(socketID, creatorName);
  }

  // Get game ID
  getID() {
    return this.gameID;
  }

  // Add a player
  addPlayer(socket, username) {
    this.players[socket] = {
      username,
      score: 0,
      answers: [],
    };
    this.playerCount++;
  }
  // Remove a player
  removePlayer(socket) {
    delete this.player[socket];
    this.playerCount--;
  }

  // get current question
  getCurrQuestion() {
    return this.questions[currentRound];
  }
  // increment round
  nextRound() {
    this.answersRecieved = 0;
    this.currentRound++;
  }

  everyoneHasAnswered() {
    return this.players === this.answersRecieved;
  }

  /**
   * player: {
   *  playerName:
   *  score:
   *  answers: [];
   * }
   */
  // checkPlayerAnswer
  checkPlayerAnswer(socket, answer) {
    this.answersRecieved++;
    this.players[socket].answers.push(answer);
    if (answer === this.questions[this.currentRound].correct_answer) {
      this.players[socket].score + 100;
    }
  }

  // getScores
  getScores() {
    return this.players;
  }

  // check if Game is Over
  isGameOver() {
    return this.currentRound >= this.questions.length;
  }
}

module.exports = Game;
