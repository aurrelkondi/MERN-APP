const Product = require('../models/Product')
   , {faker} = require('@faker-js/faker')

const addProduct = (req, res) =>{
    const newProduct = {
        product_title: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: faker.datatype.number(),
        created_at: Date.now(),
        added_by: req.params.userId
    }

    new Product(newProduct).save((err,data)=>{
        if(err) {
            return console.log(err)
        }
        res.json({
            msg:data.product_title + ' has been added'
        })
    })

}

module.exports = addProduct