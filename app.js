const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require("./models/Restaurant")
const methodOverride = require('method-override')
const bodyParser = require('body-parser')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    formInputNew: function (tag, show, type) {
      return `<label for="${tag}">${show}</label>
          <input type="${type}" id="${tag}" placeholder="${tag}" name="${tag}"><br>`
    }
  }
}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(err => console.log(err))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  // if no keyword, redirect to baseUrl
  if (!keyword) return res.redirect(req.baseUrl + '/')

  Restaurant.find(
    {
      $or: [
        { name: { "$regex": keyword, "$options": "i" } },
        { category: { "$regex": keyword, "$options": "i" } }
      ]
    })
    .lean()
    .then(restaurants => {
      restaurants.length
        ? res.render('index', { restaurants, keyword })
        : res.render('error', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id

  Restaurant.findOne({ id: restaurant_id })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/explore/:restaurant_category', (req, res) => {
  Restaurant.find({ category: req.params.restaurant_category })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findOne({ id: restaurant_id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findOneAndUpdate({ id: restaurant_id }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findOneAndDelete({ id: restaurant_id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})