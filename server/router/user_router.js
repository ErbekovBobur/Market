const Router = require('express').Router;
const user_control = require('../controllers/user_control')
const router = new Router();

router.post('/registration', user_control.registration);
router.post('/login', user_control.login);
router.post('/users', user_control.get_users);

module.exports = router;