import Models from "../database/models";

const {students, classrooms} = Models;


class studentController{

    static async addStudent(req, res){
        const {classroom_id,student_name,gender,dob}=req.body;
        try {
            const found=await classrooms.findOne({
                where : {id:classroom_id}
            });
            if(found){
                await students.create({
                    classroom_id,
                    student_name,
                    gender,
                    dob
                });
                res.status(200).json({
                    status:200,
                    message:"Student added successfuly",
                });

            }
            res.status(404).json({
                status:404,
                message:"Classroom not found, Please put valid classroom. ",
            })
           
         } catch (error) {
            return res.status(500).json({
                status:500,
                message:"Server error "+ error.message,
            })
            
        }
    }

    static async getOneStudent(req,res){
        const modelId=req.params.id;
        try {
            const singleStudent=await students.findOne({
                where: {id:modelId},
            });
            if(singleStudent){
                res.status(200).json({
                    status:200,
                    message: "Retrieve a student",
                    data:singleStudent,
                });
            }
            res.status(404).json({
                status:404,
                message:"Student not found",

            })
            
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:"Server error " +error.message,
            })
            
        }
    }
    static async getAllStudent(req,res){

        try {
            const getAllstudents=await students.findAll();
            if(!getAllstudents){
                res.status(404).json({
                    status:404,
                    message:"No student found",
                });
            }
            res.status(200).json({
                status:200,
                message:"List all student",
                data:getAllstudents,
            })

            
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"Server error" + error.message,
            })
            
        }
    }
    static async deleteStudent(req,res){
        const modelId=req.params.id;
        try {
            const found=await students.findOne({
                where : {id:modelId},
            });
            if(found){
                await students.destroy({
                    where :{id:modelId},
                });
                res.status(200).json({
                    status:200,
                    message:"Student  Deleted",
                });
                
            }
            res.status(404).json({
                status:404,
                message:"Student not found",
            })
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:"Server error"+ error.message,
            })
            
        }
    }

}

export default studentController;