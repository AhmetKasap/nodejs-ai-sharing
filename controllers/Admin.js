require('dotenv').config()
const axios = require('axios');

const userInfo = require('../models/UserInfo')
const UserVideo = require('../models/UserVideo')

const getAdmin = (req, res) => {

    const id = res.locals.user.id

    userInfo.findOne({ userRef: id })
        .then(data => {
            if (data) {
                res.render('admin', { data: data })
                console.log(data)


            } else {
                res.render('admin')
            }
        })

}


const postAdmin = (req, res) => {

}


const getProfile = (req, res) => {
    res.render('profile')
}


const postProfile = (req, res) => {

    const info = new userInfo({
        content: req.body.content,
        img: {
            filename: req.file.filename,
            path: req.file.path,
            originalname: req.file.originalname
        },
        userRef: res.locals.user.id

    })
    info.save()

    res.redirect('/admin')

}


const getChat = (req, res) => {
    res.render('chat')
}


const postChat = async (req, res) => {
    //*config openAI
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const dataChat = await req.body.chat

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: dataChat }]
    })
    const resultChat = completion.data.choices[0].message.content
    console.log(resultChat)

    res.render('chat', { resultChat: resultChat })


}




const getChatText = async (req, res) => {
    res.render('chattext')
}


const postChatText = async (req, res) => {
    


}


const getVideoAdd = (req,res) => {
    res.render('addVideo')


}

const postVideoAdd = (req,res) => {
    const userVideo = new UserVideo({
        username : res.locals.user.name,
        title: req.body.title,
        content : req.body.content,
        video: {
            filename: req.file.filename,
            path: req.file.path,
            originalname: req.file.originalname,
            mimetype : req.file.mimetype,
            size : req.file.size
        },
        userRef : res.locals.user.id
    })
    userVideo.save()

    res.redirect('/videos')

}

const getVideos = (req,res) => {

    const id = res.locals.user.id

    UserVideo.find({userRef : id})
    .then(data => {
        res.render('videos', {data:data})
    })

}





module.exports = {
    getAdmin, postAdmin, getProfile, postProfile, getChat, postChat, getChatText, postChatText, 
    getVideoAdd, postVideoAdd, getVideos
}






