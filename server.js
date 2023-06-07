const express = require('express')
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
app.use(express.json())

const cors = require("cors")
app.use(cors())

const Studentrouter = require("./Router/Student")
const institueRouter = require("./Router/Institute")
app.use("/api/student",Studentrouter)
app.use("/api/institute",institueRouter)
// app.use("/api/student",Institute)

mongoose.connect(process.env.MONGO_URI)
.then( () =>{
    app.listen(process.env.PORT, () => {
        console.log("server is running")
    })
})
.catch( (err) =>{
    console.log(err)
})
