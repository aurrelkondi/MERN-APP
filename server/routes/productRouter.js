const express = require('express') 
    , productRouter = express.Router()
    , addProduct = require('../controllers/addProduct')
    , allUserProduct = require('../controllers/allUserProduct')
    , showAllProducts = require('../controllers/showAllProducts')
    , deleteProductById = require('../controllers/deleteProductById')
    , updateProduct = require('../controllers/updateProduct')
    , addProductToCart = require('../controllers/addProductToCart')

    productRouter.get('/addToCart/:productId', addProductToCart)
    productRouter.get('/add/:userId', addProduct)
    productRouter.get('/allByUser/:userId', allUserProduct) 
    productRouter.get('/all', showAllProducts)
    productRouter.get('/delete/:productId', deleteProductById)
    productRouter.post('/update', updateProduct)

module.exports = productRouter