import { Router } from "express";
const router = Router();
import DataModel from "../models/Data.js";

router.post("/",async (req,res)=>{
    const newData = new DataModel(req.body);
    try{
        const savedData = await newData.save();
        res.status(200).json(savedData);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

router.get("/",async(req,res)=>{
    try{
        const data = await DataModel.find();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
})

export default router;