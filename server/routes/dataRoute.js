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


router.put("/", async (req, res) => {
    const updatedData = req.body; 
  
    try {
      let existingData = await DataModel.findOneAndUpdate();
  
      if (!existingData) {
        return res.status(404).json({ message: 'Document not found' });
      }
      existingData.Class1.subjects.English.chapters.Tenses.topics.push(updatedData.Class1.subjects.English.chapters.Tenses.topics);
      
      existingData = await existingData.save();
  
      res.status(200).json(existingData); 
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log(err);
    }
  });
  
export default router;