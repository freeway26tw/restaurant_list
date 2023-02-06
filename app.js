const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const Restaurant = require("./models/Restaurant")

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }))

// setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    formInputNew: function (tag, show, type) {
      return `<label for="${tag}">${show}</label>
          <input type="${type}" id="${tag}" placeholder="${tag}" name="${tag}"><br>`
    },
    selected: (sortSelected) => {
      if (sortSelected) return "selected"
    },
    ifCond: (v1, operator, v2, options) => {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    }
  }
}))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// setting static files
app.use(express.static('public'))

app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})