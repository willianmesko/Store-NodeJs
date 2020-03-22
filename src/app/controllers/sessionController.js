const User = require('../../models/user')
const mailer = require('../../libs/mailer')
const crypto = require('crypto')
const { hash } = require('bcryptjs')

class Controllers {
  loginForm(req, res) {
    if (req.session.logged) return res.redirect(`/users/${req.session.userId}`)

    return res.render('session/index.njk')
  }

  async login(req, res) {
    const { id } = req.body

    req.session.logged = true
    req.session.userId = id
    
    return res.redirect(`/users/${id}`)
  }

  async logout(req, res) {
    await req.session.destroy()

    return res.redirect('/')
  }

  forgotForm(req, res) {
    return res.render('session/forgot-password.njk')
  }

  async forgot(req, res) {
    const { id, email } = req.user
    const reset_token = crypto.randomBytes(20).toString('hex')
    const now = new Date()
    const reset_token_expires = now.setHours(now.getHours() + 1)
    
    User.schema = { id, reset_token, reset_token_expires }
    
    await User.update(User.schema)

    await mailer.sendMail({
      to: email,
      from: 'no-reply@launchstore.com.br',
      subject: 'Recuperação de senha',
      html: `
        <p>Clique no link abaixo para recuperar sua senha</p>
        <a href="http://localhost:3000/users/password-reset?token=${reset_token}" target="_blank">Recuperar senha</a>
      `
    })

    return res.render('session/forgot-password', {
      sucess: 'Verifique seu email para resetar sua senha!'
    })
  }

  resetForm(req, res) {
    const { token } = req.query

    return res.render('session/password-reset.njk', { token })
  }

  async reset(req, res) {
    const { id } = req.user
    
    req.body.password = await hash(req.body.password, 8)

    const { password } = req.body

    User.schema = {
      id,
      password,
      reset_token: '',
      reset_token_expires: ''
    }

    await User.update(User.schema)

    return res.redirect('/users/login')
  }
}

module.exports = new Controllers
