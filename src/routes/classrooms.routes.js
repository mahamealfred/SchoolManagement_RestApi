import {Router} from "express";
import classroomsController from "../controllers/classroomsController";


const route=Router();
route.post("/",classroomsController.addClassroom);
route.get("/:id",classroomsController.getOneClass);
route.get("/",classroomsController.getAllclassroom);
route.delete("/:id",classroomsController.deleteClassroom);

export default route;