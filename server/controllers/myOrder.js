const Order = require('../models/Order')

const myOrder = (req, res) =>{
   
    Order.find({customerId: req.params.customerId}, (err,data)=>{
        if(err){return console.log(err)}
        // console.log(data)
        res.json(data)
    })
}

module.exports = myOrder