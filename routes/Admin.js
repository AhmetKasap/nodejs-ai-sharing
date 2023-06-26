const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/Admin');
const middlewares = require('../middlewares/Auth');
const upload = require('../middlewares/multer')





router.get('/admin', middlewares.authenticationToken, adminControllers.getAdmin);

router.get('/profile', middlewares.authenticationToken, adminControllers.getProfile);
router.post('/profile', middlewares.authenticationToken, upload.single('image'), adminControllers.postProfile);

router.get('/chat', middlewares.authenticationToken, adminControllers.getChat)
router.post('/chat', middlewares.authenticationToken, adminControllers.postChat)

router.get('/chattext', middlewares.authenticationToken, adminControllers.getChatText)
router.post('/chattext', middlewares.authenticationToken, adminControllers.postChatText)

router.get('/video', middlewares.authenticationToken, adminControllers.getVideoAdd)
router.post('/video', middlewares.authenticationToken, upload.single('video'), adminControllers.postVideoAdd)

router.get('/videos', middlewares.authenticationToken, adminControllers.getVideos)





module.exports = router;




