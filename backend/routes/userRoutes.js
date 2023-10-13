const router = require('express').Router()

const userController = require('../controllers/userController')

router
    .route('/users')
    .post((req,res)=>userController.create(req,res))

router
    .route('/users/login')
    .post((req,res)=>userController.login(req,res))

module.exports = router