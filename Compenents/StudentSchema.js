const moongoose = require("mongoose")

const StudentScheema = new moongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    }
})

const StudentModel = moongoose.model("students",StudentScheema)
module.exports = StudentModel