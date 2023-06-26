const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/Auth')

router.get('/login', authControllers.getLogin)
router.post('/login', authControllers.postLogin)

router.get('/signup', authControllers.getSignUp)
router.post('/signup', authControllers.postSignUp)

router.get('/logout', authControllers.logOut)


module.exports = router





