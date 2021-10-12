import { Router } from "express";
import lectureController from "../controllers/lectureController";

const route=Router();

route.post("/",lectureController.addLecture);
route.get("/",lectureController.getAllLecturer);
route.get("/:id",lectureController.getOneLecture);
route.delete("/:id",lectureController.deleteLecture);
route.put("/:id",lectureController.updateLecturer);

export default route;
