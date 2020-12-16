const Game = require('../game')

gameController = {
  activeGames: {},
};

gameController.createLobby = (req, res, next) => {
  const { creator } = req.body;
  const { questions } = res.locals;
    
  const newGame = new Game(creator, questions)
  const gameID = newGame.getID();
  res.locals.gameID = gameID;
  gameController.activeGames[gameID] = newGame;
  return next();
}

module.exports = gameController;