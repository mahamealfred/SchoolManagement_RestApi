import { response } from "express";
import Models from "../database/models";

const {classrooms,students} =Models;

class classroomsController{

    static async addClassroom(req,res){

        try {
            const {class_name}=req.body;
            const newClassroom= await classrooms.create({
                class_name,
            });
            res.status(200).json({
                status:200,
                message:"Classroom added successfully.",
                data:newClassroom,
            })
            
        } catch (error) {
            return res.status(500).json({
                status:500,
                message: "Sever error" + error.message,
            })
        }
    }
  
    static async getOneClass(req,res){
        const modelId=req.params.id;
        try {
            const found= await classrooms.findOne({
                where : {id:modelId},
            });
            if(found){
                res.status(200).json({
                    status:200,
                    message:"Retrieve one classroom",
                    data:found
                })

            }
            res.status(404).json({
                status:404,
                message:"classroom not found"
            })
            
            
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:"Server error "+ error.message
            });
            
        }
    }
    static async getAllclassroom(req,res){
        try {
            const findAllclass=await classrooms.findAll();
            if(!findAllclass)
            {
                res.status(404).json({
                    status:404,
                    message:"No Classroom found",
                })
            }
            res.status(200).json({
                status:200,
                message:"All classroom",
                data:findAllclass,
            });
            
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:"Serverr error "+ error.message
            });
            
        }
    }
    static async deleteClassroom(req,res){
        const modelId=req.params.id;
        try {
            const findClass=await classrooms.findOne({
                where: { id:modelId},
            });
            if(findClass)
            {
                await classrooms.destroy({
                    where : {id:modelId},
                });
                res.status(200).json({
                    status:200,
                    message:"Classroom Deleted ",
                })
            }
            res.status(404).json({
                status:404,
                message:"Classroom not found",
            })
            
        } catch (error) {
            return  res.status(500).json({
                status:500,
                message:"Server Error " + error.message,
            });
            
        }
    }
    
}
export default classroomsController;