const { loadProducts } = require('../services/loadProductService');

class Controllers {
  async showIndex(req, res) {
    try {
      const products = await loadProducts()

      return res.render('home/index.njk', { products })
    } catch (error) {
      console.error(error)

      return res.send('Products not found!')
    }
  }
}

module.exports = new Controllers
