const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant.js')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id

  Restaurant.findOne({ id: restaurant_id })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/explore/:restaurant_category', (req, res) => {
  Restaurant.find({ category: req.params.restaurant_category })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findOne({ id: restaurant_id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findOneAndUpdate({ id: restaurant_id }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findOneAndDelete({ id: restaurant_id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router