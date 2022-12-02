const express = require('express')
const router = express.Router()


//controller
const {create,list,remove,read,update,listBy,searchFilters} = require('../controllers/product')

//middleware
const { auth, adminCheck } = require('../middleware/auth')

//endpoint http://localhost:5000/api/product
router.post('/product',auth, adminCheck, create);

router.get('/product/:count', list);

router.delete('/product/:id',auth, adminCheck, remove );

// update 
//endpoint http://localhost:5000/api/products/:id
router.get("/products/:id",read);
//endpoint http://localhost:5000/api/product/:id
router.put("/product/:id",auth, adminCheck,update)



//endpoint http://localhost:5000/api/productby
router.post("/productby/",listBy)

//search
//endpoint http://localhost:5000/api/search/filters
router.post('/search/filters',searchFilters)


module.exports = router;