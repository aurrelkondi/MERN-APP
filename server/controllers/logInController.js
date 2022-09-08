const User = require("../models/User");


const logInController = (req, res) => {
    // check if user already exists
    User.findOne({email: req.body.email}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            // If User exists in database 
            // console.log(data)
            if(data) {
                // check if password matches
                if (data.password === req.body.password) {
                    //  console.log({
                    //     login: true,
                    //     username:data.username,
                    //     id: data._id,
                    //     email: data.email
                    // })
                    // req.userId = data._id
                    res.json({
                        login: true,
                        username:data.username,
                        id: data._id,
                        email: data.email,
                        address: data.address
                    })

                } else {
                    res.json("wrong password")
                }
                // console.log(data)

            // User does not exist => sign up first
            } else {
                res.json("User not found, please sign up first")
            }
        }
    })
}   

module.exports = logInController