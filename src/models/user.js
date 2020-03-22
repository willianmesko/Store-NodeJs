const Model = require('./base')

class Users extends Model {
  constructor(table) {
    super(table)
    
    this.schema = {
      id: Number,
      name: String,
      email: String,
      password: String,
      cpf_cnpj: String,
      cep: String,
      address: String,
      reset_token: String,
      reset_token_expires: String
    }
  }
}

module.exports = new Users('users')
