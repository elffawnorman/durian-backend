const express = require('express')
const router = express.Router()


//controllers
const {listUser,login,register, editUser,deleteUser,currentUser} = require('../controllers/auth')


//Middleware
const {auth,adminCheck} = require('../middleware/auth');

//@Exnpoint http://localhost:3000/api/register
//@Method POST
//@Acess Publish;
router.post('/register',register)

//@Exnpoint http://localhost:3000/api/login
//@Method POST
//@Acess Publish
router.post('/login',login);

//@Exnpoint http://localhost:3000/api/current-user
//@Method POST
//@Acess Private
router.post('/current-user', auth, currentUser);

//@Exnpoint http://localhost:3000/api/current-admin
//@Method POST
//@Acess Private
router.post('/current-admin', auth,adminCheck, currentUser);






//@Exnpoint http://localhost:3000/api/auth
//@Method GET
//@Acess Publish
router.get('/auth',listUser);



//@Exnpoint http://localhost:3000/api/auth
//@Method PUT
//@Acess Publish
router.put('/auth',editUser);

//@Exnpoint http://localhost:3000/api/auth
//@Method DELETE
//@Acess Publish
router.delete('/auth',deleteUser);




module.exports= router