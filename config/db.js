const mongoose = require('mongoose')
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_DEPLOY)
        console.log("connect db success")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;