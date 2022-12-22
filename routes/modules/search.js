const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant.js')

router.get('/', (req, res) => {
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

module.exports = router