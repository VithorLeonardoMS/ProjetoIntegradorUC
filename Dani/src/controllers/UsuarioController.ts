import { Usuario } from "../models/Usuario";
import { Request, Response } from "express";
import { AppDataSource } from "../database/connection";
import bcrypt from "bcryptjs";

const UserRepository = AppDataSource.getRepository(Usuario);

export class UsuarioController {
  async create(req: Request, res: Response) {
    const { nome, email, senha, fotoPerfil } = req.body;

    if(!email || !senha || !nome) {
      res.status(400).json({ message: "Email, nome e senha são nescesários" });
      return;
    }

    const existEmail = await UserRepository.findOneBy({ email });

    if (existEmail) {
      res.status(409).json({ message: "Email já está em uso" });
      return;
    }

    const user = new Usuario(nome,email,senha);
    if(fotoPerfil){
      user.fotoPerfil = fotoPerfil
    }

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", usuario: user });
    return;
  }

  async login(req: Request, res: Response):Promise<Usuario | null |  void> {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.status(400).json({ message: "Email e password são nescesários" });
      return;
    }

    const existEmail = await UserRepository.findOne({
        where:{email}, 
        relations:["comentario", "postagem"]
      });

    if (!existEmail) {
      res.status(404).json({ message: "Email não encontrado" });
      return;
    }

    const isValid = await bcrypt.compare(senha, existEmail.senha);

    if (!isValid) {
      res.status(401).json({ message: "Senha invalida" });
      return;
    }

    res.status(200).json(existEmail);
    return;
  }

  
}