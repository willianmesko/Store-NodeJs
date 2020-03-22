const Model = require('./base')

class Products extends Model {
  constructor(table) {
    super(table)

    this.schema = {
      id: Number,
      category_id: Number,
      user_id: Number,
      name: String,
      description: String,
      old_price: Number,
      price: Number,
      quantity: Number,
      status: Number
    }
  }

  async search({ filter, category }) {
    try {
      const queryDefault = `SELECT * FROM ${this.TABLE} WHERE 1 = 1`
      const filterQuery = `name ILIKE '%${filter}%' OR description ILIKE '%${filter}%'`
      const categoryQuery = `category_id = ${category}`
      
      if (filter && category) {
        const query = `${queryDefault} AND (${filterQuery})  AND ${categoryQuery}`
        const { rows } = await this.db.query(query)
        
        return rows
      }
      
      if (filter) {
        const query = `${queryDefault} AND (${filterQuery})`
        const { rows } = await this.db.query(query)
        
        return rows
      }

      if (category) {
        const query = `${queryDefault} AND ${categoryQuery}`
        const { rows } = await this.db.query(query)
        
        return rows
      }

      const { rows } = await this.db.query(queryDefault)
        
      return rows
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = new Products('products')
