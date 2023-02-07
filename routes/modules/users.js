const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../../models/user')
const router = express.Router()
router.get('/login', (req, res) => {
  res.render('login', { login_error: req.flash('error') })
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureMessage: true,
  failureFlash: true
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', [
  check('email').trim().notEmpty().withMessage('Please enter your email').isEmail().withMessage('Please enter valid email'),
  check('password').trim().isLength({min: 8}).withMessage('Password less than 8 characters').isString().withMessage('Please enter valid password'),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password and confirm password are not match!')
    }
    return true
  })
],
  (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(422).render('register', {
        errorMessages: errors.array(),
        name,
        email,
        password,
        confirmPassword
      })
    }
    User.findOne({ email }).then(user => {
      if (user) {
        errors.push({ message: 'This email had been registered' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
  })
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have signed up successfully')
  res.redirect('/users/login')
})

module.exports = router