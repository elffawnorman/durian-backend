const express = require('express')
const router = express.Router()



//Middleware
const { auth, adminCheck } = require('../middleware/auth');

//controller
const { changeOrderStatus,getOrderAdmin,getProof } = require('../controllers/admin')


//@Endpoint http://localhost:5000/api/admin/order-status
//@Acess Private
router.put('/admin/order-status', auth, changeOrderStatus);
router.get('/admin/orders', auth, getOrderAdmin);

router.get('/admin/orders-proof/:id',  getProof);


module.exports = router