const { Router } = require('express');

const { isLogged } = require('../middleware/session')

const homeRoutes = require('./homeRoutes');
const usersRoutes = require('./usersRoutes');
const productsRoutes = require('./productsRoutes');
const searchRoutes = require('./searchRoutes');

const router = Router()

router.use(isLogged)

router.get('/', homeRoutes)
router.use('/users', usersRoutes)
router.use('/products', productsRoutes)
router.use('/search', searchRoutes)

module.exports = router
