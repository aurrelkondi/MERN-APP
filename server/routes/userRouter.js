/**
 * Task: Add all common routes here like index or landing page, contact page, about me etc
 * - create 2 seperate routes for user.js and product.js 
*/
const  express= require("express")
, landingRouter = express.Router()
, signUpController = require('../controllers/signUpController')
, addFakerUser = require('../controllers/fakerjs')
, logInController = require('../controllers/logInController')

landingRouter.post('/signup', signUpController)

landingRouter.get('/add', addFakerUser)

landingRouter.post('/login', logInController)

module.exports = landingRouter