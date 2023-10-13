const router = require('express').Router()

//user routes

const userRoutes = require('./userRoutes')

router.use('/', userRoutes)

module.exports = router