const axios = require('axios');

apiController = {};

apiController.buildQuery  = (req, res, next) => {
  console.log("Building query");
  console.log(req.body)
  const { amount, category, difficulty, type, timeLimit } = req.body;
    let URL = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) {
      URL += `&category=${category}`;
    }
    if (difficulty) {
        URL += `&difficulty=${difficulty}`
    }
    if (type) {
      URL += `&type=${type}`;
    }
    res.locals.URL = URL;
    return next()
}

apiController.getQuestions = (req, res, next) => {
  console.log("Fetching questions");
  const { URL } = res.locals;
  axios.get(URL)
    .then(response => {
      res.locals.questions = response.data;
      return next();
    })
    .catch(error => {
        return next(error);
    });
}

    
module.exports = apiController;