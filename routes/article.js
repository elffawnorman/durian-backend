const express = require('express')
const router = express.Router()

const { create, list, read, edit, remove, listBy } = require('../controllers/article')


//middleware
const { auth, adminCheck } = require('../middleware/auth')



//endpoint http://localhost:5000/api/article/:count
router.get('/article/:count', list);
//endpoint http://localhost:5000/api/article
router.post('/article', auth, adminCheck, create);
//endpoint http://localhost:5000/api/articles/:id
router.get('/articles/:id', read);
//endpoint http://localhost:5000/api/article/:id
router.put('/article/:id', edit);
//endpoint http://localhost:5000/api/article/:id
router.delete('/article/:id', auth, adminCheck, remove);

router.post("/articleby", listBy)




module.exports = router;