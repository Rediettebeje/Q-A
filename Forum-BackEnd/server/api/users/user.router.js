const router = require('express').Router();
const auth = require('./middleware/auth');
const { createUser, getUser, getUserById, login} = require('./user.contoller')
router.post('/', createUser);
router.get('/all', getUser);
router.get('/',auth, getUserById)
router.post('/login', login)

module.exports = router;