import Models from '../database/models';
const {lecturers} = Models;

class lectureController{

    static async addLecture(req,res){

        const {lecturer_name}=req.body;
        try {
            const newLecturer=await lecturers.create({
                lecturer_name,

            });
            res.status(200).json({
                status:200,
                message:"Lecture created successfull",
                data:newLecturer
            });
            
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"Server error" + error.message
            });
        }
    }
    static async getAllLecturer(req,res){
        try {
           const getAlllecturer=await lecturers.findAll();
           res.status(200).json({
               status:200,
               message:"All lecturer",
               data:getAlllecturer
           });
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"Server error " +error.message
            });
            
        }

    }
    static async getOneLecture(req, res){
        const modelId = req.params.id;
        try {
            const found=await lecturers.findOne({
                where: {id: modelId}
            });
            if(found){
                res.status(200).json({
                    status:200,
                    message:"Lecturer found",
                    data:found
                });
            }
            res.status(404).json({
                status:404,
                message:"Lecture not found",
            })
            
        } catch (error) {
            res.status(500).json({
               status:500,
               message:"Server error" + error.message
            })
        }
    }
    static async deleteLecture(req,res){
        const modelId=req.params.id;
        try {
            const foundLecturer=await lecturers.findOne({
                where: {id:modelId}
            });
            if(foundLecturer){
                await lecturers.destroy({
                    where:{id:modelId}
                });
                res.status(200).json({
                    status:200,
                    message:"Lecturer deleted successfully"
                });
            }
            res.status(404).json({
                status:404,
                message:"Lectured not Found"
            });

            
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"Sever error "+ error.message
            });
        }
    }
    static async updateLecturer(req,res){
        const modelId=req.params.id;
        const {lecturer_name}=req.body;
        try {
            const found=await lecturers.findOne({
                where :{id:modelId}
            });
            if(found){
                const updatedLecturer=await lecturers.update(
                  
                   {lecturer_name},
                   {where:{id:modelId},
                   returning: true, 
                   
                },
                );
                res.status(200).json({
                    status:200,
                    message:"lecture updated successfully",
                    data:updatedLecturer
                    
                });
            }
            res.status(404).json({
                status:404,
                message:"Lecturer not found",

            });
            
        } catch (error) {
            res.status(5000).json({
                status:500,
                message:"Server error" +error.message
            })
        }
    }

}
export default lectureController;