import { Router} from "express";
import authController from "../controllers/authController";
import CheckUser from "../middleware/CheckUser";
import isLogin from "../middleware/IsLogin";
import SignupValidation from "../middleware/SignupValidation";


const route=Router();

route.post('/signup',SignupValidation, CheckUser,authController.signup);
route.post('/login',CheckUser,authController.login);
route.get("/",isLogin,authController.getAllUser);
route.get("/:id",isLogin, authController.getOneUser);
route.delete("/:id",authController.deleteUser);


export default route;