class Game {
  constructor(creator, questions) {
    this.gameID = Math.floor(Math.random() * 10000);
    this.currentRound = 0;
    this.playerCount = 0;
    this.answersRecieved = 0;
    this.players = { creator };
    this.questions = questions;
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

  // checkPlayerAnswer
    checkPlayerAnswer(socket, answer) {
      this.answersRecieved++
    if (answer === this.questions[this.currentRound].correct_answer) {
      this.players[socket].score + 100;
    }
  }
  
  // getScores
    getScores() {
        return this.players;
    }
}

module.exports = Game;