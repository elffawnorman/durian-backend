const jwt = require("jsonwebtoken");
const User = require("../models/User");


//เช็คว่า User ได้ล็อคอินหรือไม่
exports.auth = (req,res,next) =>{
    try{
        const token = req.headers["authtoken"];
        if(!token){
            return res.status(401).send("No token, Authorization denied")
        }
        const decoded = jwt.verify(token,'jwtSecret')
        console.log("Middleware", decoded)
        req.user =decoded.user
        next()
    }catch(err){
        console.log(err)
        res.status(401).send('Token Invalid')
    }
};
//เช็คว่า admin ได้ล็อคอินหรือไม่
exports.adminCheck = async(req,res,next) =>{
    try{
        const{username} =req.user
        const adminUser= await User.findOne({username})
        if(adminUser.role !=='admin'){
            res.status(403).send(err,'Admin access denied')
        }else{
            next()
        }

    }catch(err){
        console.log(err)
        res.status(401).send('Admin access denied')
    }
};