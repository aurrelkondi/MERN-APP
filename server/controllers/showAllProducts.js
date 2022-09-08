const Product = require('../models/Product')

const showAllProducts = (req, res) =>{
    Product.find()
    .then(data=>{
        res.json(data)
    })
}

module.exports = showAllProducts