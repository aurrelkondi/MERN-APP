const Product = require('../models/Product')

const deleteProductById = (req, res) =>{
    Product.deleteOne({_id:req.params.productId}, ()=>{
        res.json({deleted: true})
    })

}

module.exports = deleteProductById