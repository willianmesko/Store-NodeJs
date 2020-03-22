const User = require('../../models/user')

const redirectToLogin = (req, res, next) => {
  if (!req.session.userId) return res.redirect('/users/login')

  next()
}

const isLogged = async (req, res, next) => {
  if (req.session.logged) {
    const [user] = await User.find('id', req.session.userId)

    res.locals.user = user
  }

  next()
}

module.exports = { redirectToLogin, isLogged }
