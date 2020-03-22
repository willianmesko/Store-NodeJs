const Product = require('../../models/product');
const File = require('../../models/file');
const { formatPrice, formatDate } = require('../../libs/utils');

const getImages = async productId => {
  try {
    const files = await File.find('product_id', productId)

    await Promise.all(
      files.map(file => file.src = file.path.replace('public', ''))
    )

    return files
  } catch (error) {
    throw Error(error)
  }
}

const formatProduct = async product => {
  try {
    const [file] = await getImages(product.id)
    const { day, month, hour, minutes } = formatDate(product.updated_at)
    
    product.formattedPrice = formatPrice(product.price)
    product.formattedOdld_price = formatPrice(product.old_price)
    product.img = file.src
    product.published = { day: `${day}/${month}`, hour: `${hour}h${minutes}` }
  
    return product
  } catch (error) {
    throw Error(error)
  }
}

const loadProducts = async ({ filter, category } = {}, userId) => {
  try {
    const products = await Product.findAll({ orderBy: 'updated_at', order: 'DESC' })
    
    if (filter || category) {
      const products = await Product.search({ filter, category })

      await Promise.all(products.map(formatProduct))

      return products
    }

    if (userId) {
      const products = await Product.find('user_id', userId)
      
      await Promise.all(products.map(formatProduct))

      return products
    }

    await Promise.all(products.map(formatProduct))

    return products
  } catch (error) {
    throw Error(error)
  }
}

const loadProduct = async productId => {
  try {
    const [product] = await Product.find('id', productId)
    const files = await getImages(productId)

    await formatProduct(product)

    return { product, files }
  } catch (error) {
    throw Error(error)
  }
}

module.exports = { loadProduct, loadProducts }
