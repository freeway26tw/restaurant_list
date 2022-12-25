const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant.js')

router.get('/', (req, res) => {
  const keyword = req.query.keyword || ''
  let sort = req.query.sort
  let sortBy = {}

  // 利用 object assign的方式來放sortBy的資料
  switch (sort) {
    case 'default':
      sortBy = Object.assign(sortBy, { _id: 1 })
      break
    case 'AtoZ':
      sortBy = Object.assign(sortBy, { name: 1 })
      break
    case 'ZtoA':
      sortBy = Object.assign(sortBy, { name: -1 })
      break
    case 'category':
      sortBy = Object.assign(sortBy, { category: 1 })
      break
    case 'location':
      sortBy = Object.assign(sortBy, { location: 1 })
      break
  }

  // Computed property names
  const sortSelected = { [sort]: true }

  Restaurant.find(
    {
      $or: [
        { name: { "$regex": keyword, "$options": "i" } },
        { category: { "$regex": keyword, "$options": "i" } }
      ]
    })
    .lean()
    .sort(sortBy)
    .then(restaurants => {
      restaurants.length
        ? res.render('index', { restaurants, keyword, sortSelected })
        : res.render('error', { restaurants, keyword })
    })
    .catch(error => {
      console.log(error)
      res.render('error', { error })
    })
})

router.get('/explore/:restaurant_category', (req, res) => {
  Restaurant.find({ category: req.params.restaurant_category })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => {
      console.log(error)
      res.render('error', { error })
    })
})

module.exports = router