import { Request, Response } from "express";
import { AppDataSource } from "../database/connection";
import { User } from "../models/User";
import bcryptjs from "bcryptjs";
import { UserService } from "../services/UserService";
import { IRequestUser } from "../interfaces/IUser";

const userRepository = AppDataSource.getRepository(User);

export class UserController {
  private userService: UserService

  constructor(){
    this.userService = new UserService();
  }

  /**
   * @param req 
   * @param res 
   * @returns -> Retorna o usuario criado
   */
  async create(req: Request, res: Response):Promise<Response> {
    const userData: IRequestUser = req.body;
    
    const user = await this.userService.createUser(userData);

    return res.status(201).json(user)
  }
  

  async findAll(req: Request, res: Response):Promise<Response> {
    const users = await this.userService.getAllUsers();
    return res.json(users);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
  
    const user = await userRepository.findOneBy({ email });
  
    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
  
    const isValid = await bcryptjs.compare(password, user.password);
  
    if (!isValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }
  
    return res.status(200).json({
      message: "Login bem-sucedido",
      id: user.id, // ESSENCIAL para salvar no localStorage
    });
  }
  
  

  // Buscar usuário por ID
  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await this.userService.getUserById(Number(id));
    return res.json(user)
  }

  // Atualizar usuário
  async update(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const courseData: IRequestUser = req.body;
    const course = await this.userService.updateUser(
      Number(id),
      courseData
    );
    return res.json(course);
  }

  // Deletar usuário
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.userService.deleteUser(Number(id));
    return res.status(204).send();
  }

}
