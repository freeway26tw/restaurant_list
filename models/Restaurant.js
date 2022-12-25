const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantListSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: false },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true }
})
module.exports = mongoose.model('Restaurant', restaurantListSchema)