const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require("./models/Restaurant")

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
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

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

  const restaurants = restaurantList.filter(restaurant => {
    return (restaurant.name + restaurant.category).toLowerCase().includes(keyword.toLowerCase())
  })
  // check if results found
  restaurants.length ? res.render('index', { restaurants, keyword }) : res.render('error', { restaurants, keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant })
})

app.get('/restaurants/explore/:restaurant_category', (req, res) => {
  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.category.toString() === req.params.restaurant_category
  })
  res.render('index', { restaurants, keyword: req.params.restaurant_category })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})