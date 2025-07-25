import { Comentario } from "../../classes/ComentarioAntigo";
import { Aula } from "../../classes/Postagem/AulaAntigo";
import { CursoExterno } from "../../classes/Postagem/CursoExterno";
import { CursoInterno } from "../../classes/Postagem/CursoInterno";
import { Postagem } from "../../classes/Postagem/Postagem";
import { Resposta } from "../../classes/RespostaAntigo";
import { Usuario } from "../../classes/UsuarioAntigo";

type FiltroPostagem = {
    postagens: boolean;
    cursosInternos: boolean;
    cursosExternos: boolean;
    aulas: boolean;
};

type Post = Postagem | CursoExterno | CursoInterno | Aula;

export function filtarPosts(filtro:FiltroPostagem, posts:Post[], usuario:Usuario):Post[]{
    let result = posts
    if(filtro.postagens){
        result = result.filter(post => {
            post instanceof Postagem
        })
    }
    if(filtro.cursosExternos){
        result = result.filter(post => {
            post instanceof CursoExterno
        })
    }
    if(filtro.cursosInternos){
        result = result.filter(post => {
            post instanceof CursoInterno
        })
    }
    if(filtro.aulas){
        result = result.filter(post => {
            post instanceof Aula
        })
    }

    return result;
}