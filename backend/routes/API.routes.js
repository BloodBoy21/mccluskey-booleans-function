const router = require('express').Router()
const { apiController } = require('../controllers')

router.post('/table', apiController.table)

module.exports = router
