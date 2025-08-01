import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();
const userController = new UserController();

routes.get("/users", userController.list);
routes.post("/users", userController.create);
routes.get("/users/:id", userController.show);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.delete);
routes.post("/usersLogin", userController.login);

export default routes;