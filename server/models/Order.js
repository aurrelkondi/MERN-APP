const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const orderSchema = new Schema({
    order: Array,
    customerId: {
        type: Schema.Types.ObjectId,  // foreigner
        ref: 'user'
      },
    created_at: Date,
    totalPrice: Number,
    address: Object
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order; 