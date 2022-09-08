 const {faker} = require('@faker-js/faker')
      , User = require('../models/User')


const addFakerUser = (req, res) =>{
    const fakeUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        address:{
            street: faker.address.street(),
            city: faker.address.city(),
            zipcode: faker.address.zipCode()
        },
        created:new Date().toDateString()
    }
    // console.log(fakeUser)

    User.findOne({email:fakeUser.email},(err,data)=>{
        if(err){
            res.json({err:"valid check fall"})
        } else {
            // console.log(data)
            if(data){
                res.json({err: "User already exist"})
            } else {
                const newUser = new User(fakeUser)
                newUser.save((err,data)=>{
                    if(err) throw err
                    // console.log(data)
                    res.json({
                        login:true,
                        username:data.username,
                        id: data._id,
                        email: data.email,
                        address: data.address
                    })
                })
            }
        }
    })
   

}

module.exports = addFakerUser