const Restaurant = require('../Restaurant.js')
const restaurant = require('../../restaurant.json').results
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  Restaurant.create(restaurant)
  console.log('Done!')
})