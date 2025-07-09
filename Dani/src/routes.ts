import { Router } from "express";
import { CourseController } from "./controllers/CourseController";

const routes = Router();
const courseController = new CourseController();

routes.post("/cursos", (req, res) => courseController.create(req, res));
routes.get("/cursos/:id", (req, res) => courseController.findById(req, res));
routes.get("/cursos", (req, res) => courseController.findAll(req, res));
routes.put("/cursos/:id", (req, res) => courseController.update(req, res));
routes.delete("/cursos/:id", (req, res) => courseController.delete(req, res));

export { routes };
