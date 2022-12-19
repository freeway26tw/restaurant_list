const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantListSchema = new Schema({
  id: {
    type: Integer,
    required: true
  },
  name: {
    type: String
  },
  name_en: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  google_map: {
    type: String
  },
  rating: {
    type: Double
  },
  description: {
    type: String
  }
})
module.exports = mongoose.model('Restaurant-list', restaurantListSchema)