const express = require('express')
const bodyParser = require('body-parser')

const token = require('../auth/token')
const hash = require('../auth/hash')

const router = express.Router()

router.use(bodyParser.json())

// server/routes/auth.js

const {userExists, createUser, getUserByName} = require('../db/users')

router.post('/register', register, token.issue)
router.post('/signin', signIn, token.issue)

function register (req, res, next) {
  userExists(req.body.username)
    .then(exists => {
      if (exists) {
        return res.status(400).send({ message: 'User exists' })
      }
      createUser(req.body.username, req.body.password)
        .then(() => next())
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

router.get('/username', token.decode, (req, res) => {
  res.json({
    username: req.user.username
  })
})

function signIn (req, res, next) {
  getUserByName(req.body.username)
    .then(user => {
      return user || invalidCredentials(res)
    })
    .then(user => {
      return user && hash.verify(user.hash, req.body.password)
    })
    .then(isValid => {
      return isValid ? next() : invalidCredentials(res)
    })
    .catch(() => {
      res.status(400).send({
        errorType: 'DATABASE_ERROR'
      })
    })
}

function invalidCredentials (res) {
  res.status(400).send({
    errorType: 'INVALID_CREDENTIALS'
  })
}

module.exports = router
