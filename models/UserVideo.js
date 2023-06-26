const mongoose = require('mongoose')

const userVideoSchema = new mongoose.Schema({
    username : {type : String},
    title : {type : String, required : true},
    content : {type : String},
    video : {
        filename : {type : String},
        path : {type : String},
        originalname : {type : String},
        mimetype : {type : String},
        size : {type : Number},
    },
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


})

const UserVideo = mongoose.model('USERVIDEO', userVideoSchema)
module.exports = UserVideo



