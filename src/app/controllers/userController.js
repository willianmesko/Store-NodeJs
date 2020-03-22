const User = require('../../models/user')
const { loadProducts } = require('../services/loadProductService');
const { hash } = require('bcryptjs')
const { formatCpfCnpj, formatCep } = require('../../libs/utils')

class Controller {
  registerForm(req, res) {
    return res.render('user/register.njk')
  }

  async index(req, res) {
    const products = await loadProducts(req.session.userId)

    return res.render('user/ads.njk', { products })
  }

  async show(req, res) {
    const { userId } = req.session
    const [user] = await User.find('id', userId)

    user.password = ''
    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
    user.cep = formatCep(user.cep)

    return res.render('user/index.njk', { user })
  }

  async post(req, res) {
    req.body.cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g, '')
    req.body.cep = req.body.cep.replace(/\D/g, '')
    req.body.password = await hash(req.body.password, 8)
    
    const { name, email, password, cpf_cnpj, cep, address } = req.body

    User.schema = {
      name,
      email,
      password,
      cpf_cnpj,
      cep,
      address
    }

    const { id } = await User.create(User.schema)

    req.session.logged = true
    req.session.userId = id

    return res.redirect(`/users/${id}`)
  }

  async update(req, res) {
    const { id } = req.params

    req.body.cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g, '')
    req.body.cep = req.body.cep.replace(/\D/g, '')

    const { name, email, cpf_cnpj, cep, address } = req.body
    
    User.schema = {
      id,
      name,
      email,
      cpf_cnpj,
      cep,
      address
    }

    await User.update(User.schema)

    const [userUpdated] = await User.find('id', id)

    userUpdated.password = ''

    return res.render('user/index.njk', {
      user: userUpdated,
      sucess: 'Conta atualizada com sucesso!'
    })
  }

  async delete(req, res) {
    await User.delete(req.session.userId)

    req.session.destroy()

    return res.redirect('/')
  }
}

module.exports = new Controller
