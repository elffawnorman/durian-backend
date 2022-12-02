const express = require('express')
const router = express.Router()


//controllers
const { listUsers,
    readUsers,
    updateUsers,
    removeUsers,
    changeStatus,
    changeRole,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    emptyCart,
    addToWishList,
    getWishList,
    removeWishList,
    getOrder,
    readUserSingle,
    updateUserSingle,
    saveProof,
    getProof

} = require('../controllers/users')

//Middleware
const { auth, adminCheck } = require('../middleware/auth');

//@Endpoint http://localhost:5000/api/users
//@Method GET
//@Acess Private
router.get('/users', auth, adminCheck, listUsers);

//@Endpoint http://localhost:5000/api/users/:id
//@Method GET
//@Acess Private
router.get('/users/:id', readUsers);

//@Exndpoint http://localhost:5000/api/users/:id
//@Method PUT
//@Acess Private
router.put('/users/:id', auth, adminCheck, updateUsers);

//@Endpoint http://localhost:5000/api/users/:id
//@Method DELETE
//@Acess Private
router.delete('/users/:id', removeUsers);

//@Endpoint http://localhost:5000/api/change-status
//@Method POST
//@Acess Private
router.post('/change-status', auth, adminCheck, changeStatus);

//@Endpoint http://localhost:5000/api/change-role
//@Method POST
//@Acess Private
router.post('/change-role', auth, adminCheck, changeRole);

//@Endpoint http://localhost:5000/api/user/cart
//@Method POST and GET
//@Acess Private
router.post('/user/cart', auth, userCart);
router.get('/user/cart', auth, getUserCart);
router.delete('/user/cart', auth, emptyCart);

//@Endpoint http://localhost:5000/api/user/:id
//update user
router.get('/user/profile', auth, readUserSingle)
router.put('/user/profile',  updateUserSingle)


//address
router.post('/user/address', auth, saveAddress);
//order
router.post('/user/order', auth, saveOrder);
router.get('/user/orders', auth, getOrder);

router.put('/user/proof/:id', auth, saveProof);
router.get('/user/proofs/:id',  getProof);

//wishlist
router.post('/user/wishlist', auth, addToWishList);
router.get('/user/wishlist', auth, getWishList);
router.put('/user/wishlist/:productId', auth, removeWishList);



module.exports = router