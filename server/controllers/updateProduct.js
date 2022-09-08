const Product = require('../models/Product')

const updateProduct = (req, res)=>{
    // console.log(req.body)
    Product.updateOne({_id:req.body._id}, req.body ,(err, data)=>{
        if(err) return console.log(err)
        // console.log(data)
        res.json({update: true})
    })

}

module.exports = updateProduct
