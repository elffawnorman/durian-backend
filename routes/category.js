const express = require('express')
const router = express.Router()

const { create, list, read, update, remove } = require('../controllers/category')


//middleware
const { auth, adminCheck } = require('../middleware/auth')

//endpoint http/localhost:5000/api/category
router.get('/category', list);

router.post('/category', auth, adminCheck, create);

router.get('/category/:id', auth, adminCheck, read);

router.put('/category/:id', auth, adminCheck, update);

router.delete('/category/:id', auth, adminCheck, remove);





module.exports = router;