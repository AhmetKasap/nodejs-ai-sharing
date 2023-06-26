const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

//* imports
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.static('uploads'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
app.use(cookieParser())




const UserVideos = require('./models/UserVideo')


//* import routes
const auth = require('./routes/Auth')
const admin = require('./routes/Admin')

const middlewares = require('./middlewares/Auth')
app.use("*", middlewares.checkUser)

app.use(auth)
app.use(admin)

app.get('/', middlewares.authenticationToken, (req,res) => {

    UserVideos.find()
    .then(data => {
        res.render('index', {data:data})
    })
})


//* connection database
mongoose.connect(process.env.MONGO_DB)
.then(d=> console.log('connected database'))
.catch(error => console.log("error database"))





app.listen(3000)