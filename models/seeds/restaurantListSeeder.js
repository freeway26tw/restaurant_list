const bcrypt = require('bcryptjs')
const Restaurant = require('../Restaurant.js')
const User = require('../user')
const restaurant = require('../../restaurant.json').results
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurant: [1, 2, 3]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurant: [4, 5, 6]
  }
]

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, user => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash =>
        User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
      .then(userCreated => {
        const restaurantFiltered = restaurant.filter(item => user.restaurant.includes(item.id))
        return Promise.all(Array.from(
          { length: restaurantFiltered.length },
          (_, i) => Restaurant.create({ ...restaurantFiltered[i], userId: userCreated._id })
        ))
      })

  }))
    .then(() => {
      console.log('Seed data created!')
      process.exit()
    })
})