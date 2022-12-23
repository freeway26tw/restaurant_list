const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant.js')

router.get('/', (req, res) => {
  // if no keyword, redirect to baseUrl
  if (!req.query) return res.redirect(req.baseUrl + '/')
  const keyword = req.query.keyword.trim()
  const originalurl = req.originalUrl
  console.log(originalurl)

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
        ? res.render('index', { restaurants, keyword, originalurl })
        : res.render('error', { restaurants, keyword, originalurl })
    })
    .catch(error => console.log(error))
})

router.get('/sort', (req, res) => {
  console.log(this.restaurants)
  res.render('index', this.restaurants)
})

module.exports = router