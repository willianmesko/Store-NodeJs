const User = require('../../models/user')
const { compare } = require('bcryptjs')

const login = async (req, res, next) => {
  const { email, password } = req.body
  const [user] = await User.find('email', email)

  if (!user) return res.render('session/index.njk', {
    user: req.body,
    error: 'Usuário não cadastrado!'
  })

  const passed = await compare(password, user.password)

  if (!passed) return res.render('session/index.njk', {
    user: req.body,
    error: 'Senha incorreta'
  })

  req.body.id = user.id

  next()
}

const forgot = async (req, res, next) => {
  try {
    const { email } = req.body
    const [user] = await User.find('email', email)

    if (!user) return res.render('session/forgot-password.njk', {
      user: req.body,
      error: 'Email não cadastrado!'
    })

    req.user = user

    next()
  } catch (error) {
    throw Error(error)
  }
}

const reset = async (req, res, next) => {
  const { email, password, passwordRepeat, token } = req.body
  const [user] = await User.find('email', email)

  if (!user) return res.render('session/password-reset.njk', {
    user: req.body,
    token,
    error: 'Usuário não cadastrado!'
  })

  if (password != passwordRepeat) return res.render('session/password-reset.njk', {
    user: req.body,
    token,
    error: 'Senha incorretas.'
  })

  if (token != user.reset_token) return res.render('session/password-reset.njk', {
    user: req.body,
    token,
    error: 'Token inválido!'
  })

  const now = new Date()
  const expire = now.setHours(now.getHours())

  if (expire > user.reset_token_expires) return res.render('session/password-reset.njk', {
    user: req.body,
    error: 'Token expirado! Solicite uma nova recuperação de senha.'
  })

  req.user = user
  
  next()
}

module.exports = { login, forgot, reset }
