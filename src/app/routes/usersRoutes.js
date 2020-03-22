const { Router } = require('express');

const SessionController = require('../controllers/sessionController')
const UserController = require('../controllers/userController')

const ValidatorUser = require('../validators/user')
const ValidatorSession = require('../validators/session')

const router = Router()

router.get('/login', SessionController.loginForm)
router.post('/login', ValidatorSession.login, SessionController.login)
router.post('/logout', SessionController.logout)

router.get('/forgot-password', SessionController.forgotForm)
router.get('/password-reset', SessionController.resetForm)
router.post('/forgot-password', ValidatorSession.forgot, SessionController.forgot)
router.post('/password-reset', ValidatorSession.reset, SessionController.reset)

router.get('/register', UserController.registerForm)
router.post('/register', ValidatorUser.post, UserController.post)

router.get('/:id', UserController.show)
router.get('/:id/ads', UserController.index)
router.put('/:id', ValidatorUser.update, UserController.update)
router.delete('/', UserController.delete)

module.exports = router
