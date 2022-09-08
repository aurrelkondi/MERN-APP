const express = require('express') 
    , orderRouter = express.Router()
    , payOrder = require('../controllers/payOrder')
    , myOrder = require('../controllers/myOrder')

orderRouter.post('/add', payOrder)

orderRouter.get('/my/:customerId', myOrder)


module.exports =  orderRouter