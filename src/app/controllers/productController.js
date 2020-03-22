const fs = require('fs');
const Category = require('../../models/category');
const Product = require('../../models/product');
const File = require('../../models/file');
const { loadProduct } = require('../services/loadProductService');
const storeFiles = require('../services/storeFiles');

class Controllers {
  async showIndex(req, res) {
    
  }

  async show(req, res) {
    try {
      const { id } = req.params
      const { product, files } = await loadProduct(id)
  
      return res.render('products/show.njk', { product, files })
    } catch (error) {
      console.error(error)

      return res.send('Product not found!')
    }
  }

  async showCreate(req, res) {
    const categories = await Category.findAll()

    return res.render('products/create.njk', { categories })
  }

  async showUpdate(req, res) {
    try {
      const { id } = req.params
      const categories = await Category.findAll()
      const { product, files } = await loadProduct(id)
  
      return res.render('products/edit.njk', { categories, product, files })
    } catch (error) {
      console.log(error)

      res.send('Please, reload the page')
    }
  }

  async create(req, res) {
    try {
      req.body.price = req.body.price.replace(/\D/g, '')

      Product.schema = {
        category_id: req.body.category_id,
        user_id: req.session.userId,
        name: req.body.name,
        description: req.body.description,
        old_price: req.body.price,
        price: req.body.price,
        quantity: req.body.quantity
      }

      const { id } = await Product.create(Product.schema)

      await storeFiles(id, req.files)

      return res.redirect(`/products/${id}`)
    } catch (error) {
      console.error(error)

      return res.send('Please, try again!')
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const [{ price }] = await Product.find('id', id)
      
      req.body.price = Number(req.body.price.replace(/\D/g, ''))
      req.body.old_price = req.body.price !== price ? price : Number(req.body.old_price.replace(/\D/g, ''))

      Product.schema = {
        id,
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        old_price: req.body.old_price,
        price: req.body.price,
        quantity: req.body.quantity,
        status: req.body.status
      }
      
      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',')

        removedFiles.splice(removedFiles.length - 1, 1)
        
        await Promise.all(
          removedFiles.map(async fileId => {
            const [{ path }] = await File.find('id', fileId)
            
            await fs.unlinkSync(path)
            await File.delete(fileId)
          })
        )
      }
        
      await Product.update(Product.schema)
      await storeFiles(id, req.files)

      return res.redirect(`/products/${id}`)
    } catch (error) {
      console.error(error)
      
      return res.send('Please, try again!')
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const files = await File.find('product_id', id)

      await Promise.all(files.map(({ path }) => fs.unlinkSync(path)))
      await Product.delete(id)

      return res.redirect('/')
    } catch (error) {
      console.error(error)
      
      return res.send('Please, try again!')
    }
  }
}

module.exports = new Controllers
