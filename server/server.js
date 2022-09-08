const express = require('express');
const app = express();
//Task: Add .env config here so later we can use it
require('dotenv').config()
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors')
, MONGODB = process.env.MONGODB

const landingRouter = require('./routes/userRouter')
     , productRouter = require('./routes/productRouter')
     , orderRouter = require('./routes/orderRouter')

// connect DB
// task: ADD YOUR DB LINK FROM .env
//mongoose.connect('ADD YOUR DB LINK FROM .env');
mongoose.connect(MONGODB)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err))

app.use(express.json());

// app.use(express.urlencoded({extended:false}))
// Task: add cors settings here to remove cors authetication problem
app.use(cors())
// Task : add all API routes setup here


/**
 * task : Initial testing link. 
 * Please remove this it test code if its okay 
 * and add index.js router for landing page routes
 */
app.use('/user', landingRouter)

app.use('/product',productRouter )

app.use('/order', orderRouter)


/**
 * task : create index, user, product routes inside routes folder 
 * and import all of them here 
 * e.g routes paths:
 * 1. app.get('/') landing page
 * 2. app.get('/user/add')
 * 3. app.get('/product/add')
 */

app.listen(PORT, ()=>{
    console.log(`The Server is running Successfully in ${PORT} .....`);
});
