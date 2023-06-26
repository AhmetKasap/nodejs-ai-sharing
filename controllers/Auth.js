const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const getSignUp = (req,res) => {
    res.render('signup')
    
}

const postSignUp = (req,res) => {
    const username = req.body.username
    console.log(username)
    
    const user = new User ({
        name : req.body.username,
        password : req.body.userpassword
    })
    user.save()

    res.redirect('/login')
    
}


const getLogin = (req,res) => {
    res.render('login')
}

const createToken = async (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'1d'})
}

const logOut = async (req,res) => {
    await res.clearCookie('jsonwebtoken')
    await res.redirect('/login')
}

const postLogin = async (req,res) => {
    const username = req.body.username
    const userpassword = req.body.userpassword

    const user = await User.findOne({name : username})

    const isPasswordMatch = await bcrypt.compare(userpassword, user.password)
    if(user && isPasswordMatch) {
        const token = await createToken(user._id)
        res.cookie('jsonwebtoken', token, {httpOnly:true, maxAge : 1000*60*60*24})
        res.redirect('/admin')
    }
    else {
        res.redirect('/login')
    }

}

module.exports = {
    getLogin,postLogin,getSignUp,postSignUp,logOut
}










