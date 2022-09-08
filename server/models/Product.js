const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  // task: add object model for products here
  product_title: {
    type: String,
    required: true
  },
  price: Number,
  quantity: Number,
  created_at: Date,
  added_by: {
    type: Schema.Types.ObjectId,  // foreigner
    ref: 'user'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;