const expressSession = require('express-session')
const pgSession = require('connect-pg-simple')(expressSession)
const db = require('./database')

const session = expressSession({
  store: new pgSession({
    pool: db
  }),
  secret: 'sessionscret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2592000000
  }
})

module.exports = session