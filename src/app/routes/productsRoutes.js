const { Router } = require('express');
const multer = require('../middleware/multer');
const { redirectToLogin } = require('../middleware/session')

const productController = require('../controllers/productController');
const productValidator = require('../validators/product');

const router = Router()

router.get('/create', redirectToLogin, productController.showCreate)
router.get('/:id', productController.show)
router.get('/:id/edit', productController.showUpdate)
router.post('/', productValidator, multer.array('photos', 6), productController.create)
router.put('/:id', productValidator, multer.array('photos', 6), productController.update)
router.delete('/:id', productController.delete)

module.exports = router
