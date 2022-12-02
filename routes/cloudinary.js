const express = require('express')
const router = express.Router()

//controllers
const { createImage, removeImage } = require("../controllers/cloudinary")

//middleware
const { auth, adminCheck } = require('../middleware/auth')

//endpoint http/localhost:5000/api/images
router.post('/images', auth,  createImage);

router.post('/removeimages', auth, removeImage);

// router.post('/images', auth, adminCheck, createImage);

// router.post('/removeimages', auth, adminCheck, removeImage);




module.exports = router;