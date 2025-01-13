const router = require('express').Router();

const auth = require('../../api/users/middleware/auth');

const { createQuestionHandler,  getQuestionById, getQuestions,getPosts} = require('./question.controller')
router.post('/',auth, createQuestionHandler);
router.get('/all', auth,  getQuestionById);
router.get('/', getQuestions)
router.get("/post", auth, getPosts);
module.exports = router;