const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

userSchema.index({ 'email': 1, 'type': 1 }, { unique: true })

module.exports = mongoose.model('User', userSchema)