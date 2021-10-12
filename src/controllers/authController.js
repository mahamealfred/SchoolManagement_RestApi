import Models from "../database/models";
import bcrypt from "bcrypt";
const {users}=Models;
import {encode} from "../helpers/JwtTokenizer";

class authController{

    static async signup(req,res){
        try {
            if(req.user){
                return res.status(400).json({
                    status:400,
                    message:"User with Email already exist, please find other email.",
                });
            }
            const { fullName, userName,email,password,role}=req.body;
            const salt=await bcrypt.genSaltSync(10);
            const hashPassword=await bcrypt.hashSync(password,salt);

            await  users.create({
                fullName,
                userName,
                email,
                password:hashPassword,
                role,
            });
            return res.status(200).json({
                status:200,
                message:"Account created successfully",
            });
           
            
        } catch (error) {
            res.status(500).json({
                status:500,
                message:error.message,
            });
            
        }
    }
    static async login(req,res){
        const {email,password} =req.body;
        try {
            if(!req.user){
                return res.status(404).json({
                    status:404,
                    message:"User not found"
                });
            }
       const db_Email = req.user.email;
       const db_Password = req.user.password;
       const decrePassword = await bcrypt.compareSync(password, db_Password);
    
            if(db_Email == email){
                if(decrePassword){
                    const token=await encode({email});
                    
                    return res.status(200).json({
                        status:200,
                        message:"Logged In successfully",
                        data:{
                            user:req.user,
                            token,
                        },
                    });
                }
            }
            return res.status(401).json({
                status:401,
                message:"Password is not correct",
            });
    
            
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:"Server error : " +error.message,
            })
            
        }
       
    }

    static async getAllUser( req,res){

        try {
            const getAlluser=await users.findAll();
          return  res.status(200).json({
              status:200,
              message:"List of All User",
              data:{
                  getAlluser,
              },
          });

            
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:"Server error "+ error.message,
            })
        }
    }

    static async getOneUser(req,res){
        const modelId=req.params.id;

        try {
            const singleUser=await users.findOne({ 
                where :{ id:modelId}
            });
            if(singleUser){
                return res.status(200).json({
                    status:200,
                    message:"Retrieve user",
                    data:singleUser
                })
            }
            res.status(404).json({
                status: 404,
                message: "user not  found",
              });
            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: error.message });
            
        }
    }

    static async deleteUser(req,res){
        try {
            const modelId=req.params.id;
            const found=await users.findOne({
                where: {id:modelId},
            });
            
            if(found){
                const deleteUser=await users.destroy({
                    where : {id:modelId},
                });
                return res.status(200).json({
                    status:200,
                    message:"User deleted",
                    data:deleteUser,
                });
            }
            res.status(404).json({
                status:404,
                message:"User not found",
            })
        } catch (error) {
            res.status(500).json({
                status:500,
                message: "Server error "+ error.message
            });
            
        }
    }

   
    

}

export default authController;