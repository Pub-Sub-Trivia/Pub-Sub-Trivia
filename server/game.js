var decode = require('decode-html');

class Game {
  constructor(socketID, creatorName, questions) {
    this.gameID = Math.floor(Math.random() * 10000);
    this.currentRound = 0;
    this.playerCount = -1;
    this.answersRecieved = 0;
    this.players = {};
    this.questions = this.parseQuestions(questions);
    this.addPlayer(socketID, creatorName);
  }

  // Get game ID
  getID() {
    return this.gameID;
  }

  // Add a player
  addPlayer(socket, username) {
    console.log(username, socket);
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
    return this.questions[this.currentRound];
  }
  // increment round
  nextRound() {
    console.log("next round");
    this.answersRecieved = 0;
    this.currentRound++;
  }

  everyoneHasAnswered() {
    console.log(this.playerCount === this.answersRecieved);
    console.log(this.playerCount, this.answersRecieved);
    return this.playerCount === this.answersRecieved;
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
    console.log(answer);
    console.log(this.questions[this.currentRound].correct_answer);
    if (answer === this.questions[this.currentRound].correct_answer) {
      this.players[socket].score += 100;
    }
  }

  // getScores
  getScores() {
    console.log(this.players);
    return this.players;
  }

  // check if Game is Over
  isGameOver() {
    return this.currentRound >= this.questions.length;
  }

  convert(str)
  {
    str = decode(str);
    str = str.replace(/&#039;/g, "'");
    return str;
  }
  parseQuestions(arrayOfQuestions) {
    for(let i = 0; i < arrayOfQuestions.length; i++) {
      arrayOfQuestions[i].question = this.convert(arrayOfQuestions[i].question);
      arrayOfQuestions[i].correct_answer = this.convert(arrayOfQuestions[i].correct_answer);
      arrayOfQuestions[i].incorrect_answers[0] = this.convert(arrayOfQuestions[i].incorrect_answers[0]);
      arrayOfQuestions[i].incorrect_answers[1] = this.convert(arrayOfQuestions[i].incorrect_answers[1]);
      arrayOfQuestions[i].incorrect_answers[2] = this.convert(arrayOfQuestions[i].incorrect_answers[2]);
    }
    return arrayOfQuestions;
  }
}

module.exports = Game;
