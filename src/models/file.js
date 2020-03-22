const Model = require('./base')

class Files extends Model {
  constructor(table) {
    super(table)

    this.schema = {
      id: Number,
      name: String,
      path: String,
      product_id: Number
    }
  }
}

module.exports = new Files('files')
