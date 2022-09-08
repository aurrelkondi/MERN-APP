const Product = require("../models/Product")

const allUserProduct = (req, res) =>{
    Product.find({added_by: req.params.userId})
    // .populate('added_by')
    .then(data=>res.json(data))
}

module.exports = allUserProduct