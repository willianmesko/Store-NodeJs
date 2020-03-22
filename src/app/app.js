const express = require('express')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const session = require('../config/session')

const routes = require('./routes')

const app = express()

app.set('views', 'src/views')
app.set('view engine', 'njk')

nunjucks.configure('src/views', {
  autoescape: false,
  watch: true,
  noCache: true,
  express: app
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session)
app.use(morgan('dev'))

app.use(routes)

module.exports = app
