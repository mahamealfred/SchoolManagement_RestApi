import {Router} from "express";
import studentController from "../controllers/studentController";



const route=Router();

route.post("/",studentController.addStudent);
route.get("/:id",studentController.getOneStudent);
route.get("/", studentController.getAllStudent);
route.delete("/:id",studentController.deleteStudent);




export default route;