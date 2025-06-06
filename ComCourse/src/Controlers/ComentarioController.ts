import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Comentario } from '../classes/Comentario';

const comentarioRepository = AppDataSource.getRepository(Comentario);

export class ComentarioController {
    // Listar todos os usuários
    async list(req: Request, res: Response) {
        const comentarios = await comentarioRepository.find({
            select:{
                id:true,
                usuarioId:true,
                texto:true,
                dataCriacao:true,
                parentId:true,
            }
        });

        res.json(comentarios);
        return;
    }

    // Criar novo usuário
    async create(req: Request, res: Response) {
        const { usuarioId, texto, parent} = req.body;

        let comentario;

        if(!usuarioId && !texto && !parent){
            if(parent){
                comentario = comentarioRepository.create({ usuarioId, texto, parent});
            } else{
                comentario = comentarioRepository.create({ usuarioId, texto});
            }
        } else{
            res.status(400).json({mensage: `usuarioId e texto precisam ser fornecidos!`})
            return;
        }

        await comentarioRepository.save(comentario);

        res.status(201).json(comentario);
        return;
    }

    // Buscar usuário por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const comentario = await comentarioRepository.findOneBy({ id: Number(id) });

        if (!comentario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.json({
            id:comentario.id,
            usuarioId:comentario.usuarioId,
            texto:comentario.texto,
            dataCriacao:comentario.dataCriacao,
            parentId:comentario.parentId
        });
        return;
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { texto} = req.body;

        const user = await comentarioRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        if(!name || !email || !password || !role){
            res.status(400).json({mensage: `Algum dos campos de ser fornecido - name, email, password e role`})
            return;
        }

        user.name = name;
        user.email = email;
        user.password = password;
        user.role = role;

        await comentarioRepository.save(user);

        res.json(user);
        return;
    }

    // Deletar usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const user = await comentarioRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        await comentarioRepository.remove(user);

        res.status(204).send();
        return;
    }
}