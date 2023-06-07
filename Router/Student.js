const express = require("express");
const Studentrouter = express.Router()

const StudentScheema = require("../Compenents/StudentSchema")
const {SendResponse} = require("../Compenents/Helper")

Studentrouter.get('/' ,async (req , res) =>{
    try{
        let result =  await StudentScheema.find()
        if(!result){
            res.send(SendResponse("404",null,"Data not Found","error Found")).status(404)
        }else{  
           res.send(SendResponse("200",result,"Data Found",null)).status(200)
        }
    }catch(e){
        console.log(e)
    }
})

Studentrouter.get('/:id', async (req,res) =>{
try{
   let id = req.params.id
    let result = await StudentScheema.findById(id)   
    if(!result){
        res.send(SendResponse(false,null,"not Found","Error"))
  }else{
    res.send(result).status(200)
    }
}catch(e){
    console.log(e)
}
})

Studentrouter.post('/' , async (req,res) =>{
    let {firstName , lastName ,contact} = req.body
    try{
        let errArr = []
        if(!firstName){
            errArr.push("firstname required")
            return
        }
        if(!lastName){
            errArr.push("lastName required")
            return
        }
        if(!contact){
            errArr.push("Contact number required")
            return
        }
        
            if(errArr.length > 0){
                res.send(SendResponse(404,null,errArr,"required error","Error")).status(404)
                return;
            }else{
                let obj = {firstName , lastName ,contact}
                let sendData =  new StudentScheema(obj)
                await sendData.save()
                if(!sendData){
                    res.send(SendResponse(404,null,"Data not Save to Database","Error")).status(404)
                }else{
                res.send(SendResponse(200,sendData,"Data send Sucessfully","no error")).status(200)   
                }
            }
}catch(e){

    }
})

Studentrouter.put('/:id' , async (req,res) =>{
    try{
        let id = req.params.id 
        let result = await StudentScheema.findById(id)
        if(!result){
            res.send(SendResponse(false,null,"no id found","error")).status(404)
        }else{  

            let update = await StudentScheema.findByIdAndUpdate(id,req.body,{new:true})
        if(!update){
            res.send(SendResponse(false,null,"not upadate","error")).status(404)
        }else{
            res.send(SendResponse(true,update,"sucessfully Update","sucess")).status(200)
        }

        }
    }catch(e){
        res.send(SendResponse(true,null,"error Put getiing","err"))
    }
})

Studentrouter.delete('/' , async (req,res) =>{
        try{    
            let id = req.params.id
            let chckId = await StudentScheema.findById(id)

            if(!chckId){
            res.send(SendResponse(false,null,"no ID found","error"))
                return
            }else{
            let dele = await StudentScheema.findByIdAndDelete(chckId)
             if(!dele)   {
                res.send(SendResponse(false,null,"no Delete","error"))
             }else{
            res.send(SendResponse(false,dele,"Succesfully delete","sucess")).status(200)
             }
            }

        }catch(e){
            res.send(SendResponse(false,null,"Internal erroe","error"))
        }
})

module.exports = Studentrouter
