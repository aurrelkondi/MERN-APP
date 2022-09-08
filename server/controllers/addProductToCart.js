const Product = require('../models/Product')

const addProductToCart = (req, res)=>{
    Product.findOne({_id: req.params.productId}, (err, product)=>{
        Product.updateOne({_id: req.params.productId}, {quantity: product.quantity-1}, ()=>{
            res.json({update: true})
        })
    })
   
}

module.exports = addProductToCart