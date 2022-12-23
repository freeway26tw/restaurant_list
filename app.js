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
    sort: () => {
      return `<select onchange="window.location = '/?Order=' + this.options[this.selectedIndex].value;">
        <option value="">Select...</option>
        <option value="AtoZ">A->Z</option>
        <option value="ZtoA">Z->A</option>
        <option value="category">類別</option>
        <option value="region">Region</option>
      </select>`
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