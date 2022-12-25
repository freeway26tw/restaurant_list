const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant.js')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id

  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('error', { error })
    })
})



router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('error', { error })
    })
})

router.get('/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('error', { error })
    })
})

router.put('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  console.log(restaurant_id)
  return Restaurant.findByIdAndUpdate({ _id: restaurant_id }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('error', { error })
    })
})

router.delete('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findByIdAndDelete(restaurant_id)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('error', { error })
    })
})

module.exports = router