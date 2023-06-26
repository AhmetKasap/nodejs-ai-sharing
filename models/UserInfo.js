const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
    content : {type : String, required : true},
    img : {
        filename  : {type: String},
        path : {type : String},
        originalname : {type : String}
    },
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }



})

const UserInfo = mongoose.model('USERINFO', userInfoSchema)
module.exports = UserInfo