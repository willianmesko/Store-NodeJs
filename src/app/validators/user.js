const User = require('../../models/user')
const { compare } = require('bcryptjs')

const checkAllFields = body => {
  for (const values of Object.values(body)) {
    if (values === '') return {
      user: body,
      error: 'Por favor, preencha todos os campos.'
    }
  }
}

const post = async (req, res, next) => {
  const fillAllFields = checkAllFields(req.body)

  if (fillAllFields) return res.render('user/register.njk', fillAllFields)

  req.body.cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g, '')

  const { email, cpf_cnpj, password, password_repeat } = req.body
  const [userEmail] = await User.find('email', email)
  const [userCpfCnpj] = await User.find('cpf_cnpj', cpf_cnpj)

  if (userEmail || userCpfCnpj) return res.render('user/register.njk', {
    user: req.body,
    error: 'Usuário já cadastrado.'
  })

  if (password != password_repeat) return res.render('user/register.njk', {
    user: req.body,
    error: 'Senha incorretas.'
  })

  next()
}

const update = async (req, res, next) => {
  const { id } = req.params
  const fillAllFields = checkAllFields(req.body)

  if (fillAllFields) return res.render('user/index.njk', fillAllFields)

  const { password } = req.body
  
  if (!password) return res.render('user/index.njk', {
    user: req.body,
    error: 'Coloque sua senha para atualizar o cadastro.'
  })

  const [{ password: UserPassword }] = await User.find('id', id)
  const passed = await compare(password, UserPassword)

  if (!passed) return res.render('user/index.njk', {
    user: req.body,
    error: 'Senha incorreta'
  })

  next()
}

module.exports = { post, update }
