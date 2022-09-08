const Order = require('../models/Order')

const payOrder = (req, res) =>{
    new Order(req.body).save((err,data)=>{
        if(err) return console.log(err)
        res.json(data)
    })

}

module.exports = payOrder