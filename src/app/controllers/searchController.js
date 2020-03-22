const Category = require('../../models/category');
const { loadProducts } = require('../services/loadProductService');

class Controllers {
  async showIndex(req, res) {
    try {
      const { filter, category } = req.query
      const categories = await Category.findAll()
      const products = await loadProducts({ filter, category })
      const search = { term: filter, total: products.length }

      return res.render('search/index.njk', { products, categories, search })
    } catch (error) {
      console.error(error)

      return res.send('Products not found!')
    }
  }
}

module.exports = new Controllers
