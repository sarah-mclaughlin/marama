const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
// const development = require('../db/knexfile').development

const db = require('../db/db.js')

module.exports = router

router.use(bodyParser.json())

<<<<<<< HEAD
router.get('/:interests', (req, res) => {
  db.getType()
    .then((type) => {
      res.send({type})
=======
router.get('/', (req, res) => {
  db.getInterests()
    .then((interests) => {
      res.send({interests})
>>>>>>> 0c3509f3c300df2523de47a8ba6af3efa54c9d02
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})
