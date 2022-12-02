const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
//const dotenv = require('dotenv')
require('dotenv').config();
const { readdirSync } = require('fs')
const connectDB = require('./config/db')


const app = express()
//connectDBD
connectDB()

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())

//Route 1
// http://localhost:3000/api/
//app.use('/api',require('./routes/api'))
//Route 2
readdirSync('./routes').map((r)=> app.use('/api',require('./routes/'+r)))

const port = process.env.PORT
app.listen(port,()=>{
    console.log('Server is running'+port)
})