const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require("./models/Restaurant")

const routes = require('./routes')
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
    }
  }
}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})