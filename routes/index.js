var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Definición de rutas de /quizzes
router.get('/quizzes.:format?',                     quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?',       quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);
router.get('/author', quizController.author);

module.exports = router;
