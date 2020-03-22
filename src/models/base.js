const pg = require('../config/database')

class Model {
  constructor(table) {
    this.db = pg
    this.TABLE = table
  }

  async create(data) {
    try {
      const columns = Object.keys(data)
      const values = Object.values(data)
      const query = `
        INSERT INTO ${this.TABLE} (
          ${columns.join(',')}
        ) VALUES (${columns.map((column, i) => `$${i + 1}`).join(',')})
        RETURNING id
      `
      
      const { rows } = await this.db.query(query, values)

      return rows[0]
    } catch (error) {
      throw Error(error)
    }
  }

  async findAll({ orderBy, order } = {}) {
    try {
      const orderQuery = `ORDER BY ${orderBy} ${order}`
      const query = `
        SELECT * FROM ${this.TABLE} 
        ${orderBy !== undefined ? orderQuery: ''}
      `
      const { rows } = await this.db.query(query)
      
      return rows 
    } catch (error) {
      throw Error(error)
    }
  }

  async find(key, value) {
    try {
      const query = `SELECT * FROM ${this.TABLE} WHERE ${key} = $1`
      const { rows } = await this.db.query(query, [value])

      return rows
    } catch (error) {
      throw Error(error)
    }
  }

  async update(data) {
    try {
      const columns = Object.keys(data)
      const values = Object.values(data)
      const query = `
        UPDATE ${this.TABLE} SET 
          ${columns.map((column, i) => `${column}=($${i + 1})`).join(',')}
        WHERE id = ${data.id}
      `
      const res = await this.db.query(query, values) 

      return res
    } catch (error) {
      throw Error(error)
    }
  }

  async delete(id) {
    try {
      const query = `DELETE FROM ${this.TABLE} WHERE id = $1`
      const res = await this.db.query(query, [id])

      return res
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = Model
