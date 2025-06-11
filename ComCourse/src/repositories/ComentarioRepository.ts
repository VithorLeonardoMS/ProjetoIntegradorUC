import { AppDataSource } from "../config/data-source";
import { Comentario } from "../classes/Comentario";

export class ComentarioRepository {
    private repo = AppDataSource.getRepository("Comentario")

    async criarComentario(texto:string, parent?: Comentario){
        const coment = new Comentario(texto, parent || undefined)
        return await this.repo.save(coment)
    }

    async findComentarioById(id: number) {
        return await this.repo.findOne({ where: { id } });
    }

    async listAllComentarios(){
        return await this.repo.find()
    }

    async updateComentario(id:number, mudancas: Partial<Comentario>){
        const comentario = this.repo.findOne({ where:{id} })

        Object.assign(comentario, mudancas);
        return await this.repo.save(comentario);
    }

    async deleteComentario(id:number){
        return await this.repo.delete({id})
    }
} 