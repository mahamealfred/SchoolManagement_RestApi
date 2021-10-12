import Models from "../database/models";
import {decode} from "../helpers/JwtTokenizer";
const {users} =Models;


const isLogin=async (req,res,next) =>{
    const Token =req.headers['my-token'];

    if(!Token){
        return res.status(403).json({
            status:403,
            message: "Please login",
        });
    }
    const payload=await decode(Token);
    const {email}=payload;

    const found =await users.findOne({ where: {email}});
    if(!found){
        return res.status(404).json({
            status: 404,
            message: "User not Found",
        })
    }
    req.user=found;
    return next();
};
export default isLogin;