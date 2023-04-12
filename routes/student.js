import express from "express"
import { addStudent, deleteStudent, getStudent, updateStudent } from "../controllers/student.js";
import {client} from "../db.js"  // for connection
import { ObjectId } from "../db.js";

const router = express.Router();

router.get("/", async(req,res)=>{
    try {
        const allData = await getStudent()
        res.status(200).json({data:allData});
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({data:"Internal Server Error"})
    }
    
   })

router.post("/", async(req,res)=>{
    try {
        const newData = req.body;
        if(!newData){
            res.status(400).json({data:"No Content Provided"})
            return
        }
        const result = await addStudent(newData)
        res.status(201).json({data:"Data Added Sucessfully"})
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({data:"Internal Server Error"})
    }
})   

router.put("/:id",async(req,res)=>{
    const {id} = req.params;
    try {
       const updateData = req.body;
       if(!updateData) {
        res.status(400).json({data:"No Content Provided"})
       }
       const answer = await updateStudent(id,updateData)
       res.status(200).json({data:"Edited Sucessfully"})
        
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({data:"Internal Server Error"})
    }
})

router.delete("/:id",async(req,res)=>{
    const {id} = req.params;
    try {
       const answer = await deleteStudent(id)
        res.status(200).json({data:"Deleted Sucessfully"})
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({data:"Internal Server Error"})
    }
})


export const studentsRouter = router