const router = require('express').Router();
const auth = require('../../api/users/middleware/auth');
const { solveQuestion,   getAnswerByQuestionId,getAllAnswers} = require('./answer.controller')
router.post('/',auth, solveQuestion);
router.get('/all', getAnswerByQuestionId);
router.get("/:questionId", getAllAnswers);

module.exports = router;