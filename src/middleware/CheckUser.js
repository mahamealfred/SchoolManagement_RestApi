import Models from "../database/models";


const CheckUser=async (req,res,next) =>{
const {email}=req.body;
const {users}=Models;

const foundUser=await users.findOne({ where: {email}});
if(foundUser){
    req.user=foundUser
    return next()
}
req.user=null
next();
};

export default CheckUser;