const  mongoose = require("mongoose");

let InstituteScheema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    shortName:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    }
})

const InstituteModel = mongoose.model("institues",InstituteScheema)
module.exports = InstituteModel