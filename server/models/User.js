const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    address:Object,
    created:String
})

const User = mongoose.model('user', userSchema)

module.exports = User