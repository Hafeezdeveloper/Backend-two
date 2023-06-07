const express = require("express")
const InsRouter = express.Router()
const InstituteModel = require("../Compenents/InstitueSchema")
const { SendResponse } = require("../Compenents/Helper")


InsRouter.get("/", async (req, res) => {
    try {
        let result = await InstituteModel.find()
        if (!result) {
            res.send(SendResponse(false, null, "not found", "error")).status(404)
        } else {
            res.send(SendResponse(true, result, "Data found", "succ")).status(200)
        }
    } catch (e) {
        console.log(e)
    }
})

InsRouter.post("/", async (req, res) => {
    let { name, address, shortName, tel } = req.body
    try {
        let errArr = []
        if (!name) {
            errArr.push("required name")
            return
        }
        if (!address) {
            errArr.push("required address")
            return
        }
        if (!shortName) {
            errArr.push("required shortName")
            return
        }
        if (!tel) {
            errArr.push("required tel")
            return
        }
        if (errArr.length > 0) {
            res.send(SendResponse(false, null, "Data not Send", "error")).status(404)
        } else {
            let obj = { name, address, shortName, tel }
            let sendData = new InstituteModel(obj)
            await sendData.save()

            if (!sendData) {
                res.send(SendResponse(false, null, "not Send to Db", "error")).status(404)
                return
            } else {
                res.send(SendResponse(true, sendData, "succesfully send", "sucess")).status(200)
            }

        }


    } catch (e) {
        console.log(e)
    }
})

InsRouter.put("/:id", async (req, res) => {
    try{
        let id = req.params.id
        let result = await InstituteModel.findById(id)
        if(!result){
            res.send(SendResponse(false,null,"data can't found","error")).status(404)
        }else{
            let update = await InstituteModel.findByIdAndUpdate(id,req.body,{new:true})
            if(!update){
                res.send(SendResponse(false,null,"data not update","error")).status(404)
            }else{  
                res.send(SendResponse(true,update,"data update sucessfully","sucess")).status(200)
            }
        }
    }catch(e){
        console.log(e)
    }
})

InsRouter.delete("/:id", async (req, res) => {
    try{
        let id = req.params.id
        let chckId = await InstituteModel.findById(id)

        if(!chckId){
        res.send(SendResponse(false,null,"no ID found","error"))
            return
        }else{
        let dele = await InstituteModel.findByIdAndDelete(chckId)
         if(!dele)   {
            res.send(SendResponse(false,null,"no Delete","error"))
         }else{
        res.send(SendResponse(false,dele,"Succesfully delete","sucess")).status(200)
         }
        }

    }catch(e){
        console.log(e)
    }
})


module.exports = InsRouter