import { Comentario } from "../../classes/ComentarioAntigo";
import { Aula } from "../../classes/Postagem/AulaAntigo";
import { CursoExterno } from "../../classes/Postagem/CursoExterno";
import { CursoInterno } from "../../classes/Postagem/CursoInterno";
import { Postagem } from "../../classes/Postagem/Postagem";
import { Resposta } from "../../classes/RespostaAntigo";
import { Usuario } from "../../classes/UsuarioAntigo";
import { filtarPosts } from "../filtragem/filtrarPosts";
import { ordenarPosts } from "../filtragem/ordenarPosts";

const rl = require("readline-sync")

type Coment = Comentario | Resposta 
type Ordem = "maisLikes" | "menosLikes" | "dataDeEnvio" | "cargaHoraria" | "nenhum";
type FiltroPostagem = {
    postagens: boolean;
    cursosInternos: boolean;
    cursosExternos: boolean;
    aulas: boolean;
};
type Post = Postagem | CursoExterno | CursoInterno | Aula;

export function olharDinamicoDeUsuarios(usuarios: Usuario[], usuario:Usuario):void{
    let teste = true
    let visiveis:number = 10

    while(teste){
        let listaAtual: Usuario[] = usuarios.slice(0,visiveis);
        if(usuario.getListagemTipo() === "Linhas"){
            console.log(listaAtual);
        } else{
            console.table(listaAtual);
        }
        console.log("0 -> voltar")
        console.log("1 -> Ver mais");
        console.log("2 -> Ver menos")
        let opcao = rl.questionInt("", {limit: ['0', '1', '2'],
        limitMessage: 'Digite 0, 1, 2'});
        
        switch(opcao){
            case 0:
                teste = false;
                return;
                break;
            case 1:
                visiveis += 10;
                break;
            case 2:
                visiveis -= 10;
                break;
        }
    }

}

export function olharDinamicoDePosts(posts: Post[], usuario:Usuario, ordem:Ordem, filtro:FiltroPostagem):void{
    let teste = true
    let visiveis:number = 10
    let renderizados:number = 50
    let listaAtual: Post[] = posts.slice(0,renderizados);
    while(teste){
        if(visiveis >= renderizados){
            renderizados += 50;
            listaAtual = listaAtual.concat(posts.slice(0,50));
        }
        listaAtual = filtarPosts(filtro, posts,usuario);
        listaAtual = ordenarPosts(listaAtual,ordem);
        let listaVisivel: Post[] =  listaAtual.slice(0, visiveis);

        if(usuario.getListagemTipo() === "Linhas"){
            console.log(listaVisivel);
        } else{
            console.table(listaVisivel);
        }

        console.log("0 -> voltar")
        console.log("1 -> Ver mais");
        console.log("2 -> Ver menos")
        let opcao = rl.questionInt("", {limit: ['0', '1', '2'],
        limitMessage: 'Digite 0, 1, 2'});
        
        switch(opcao){
            case 0:
                teste = false;
                return;
                break;
            case 1:
                visiveis += 10;
                break;
            case 2:
                visiveis -= 10;
                break;
        }
    }

}

export function olharDinamicoDeComents(coments: Coment[], usuario:Usuario):void{
    let teste = true
    let visiveis:number = 10

    while(teste){
        let listaAtual: Usuario[] | Coment[] | Post[]= coments.slice(0,visiveis);
        if(usuario.getListagemTipo() === "Linhas"){
            console.log(listaAtual);
        } else{
            console.table(listaAtual);
        }
        console.log("0 -> voltar")
        console.log("1 -> Ver mais");
        console.log("2 -> Ver menos")
        let opcao = rl.questionInt("", {limit: ['0', '1', '2'],
        limitMessage: 'Digite 0, 1, 2'});
        
        switch(opcao){
            case 0:
                teste = false;
                return;
                break;
            case 1:
                visiveis += 10;
                break;
            case 2:
                visiveis -= 10;
                break;
        }
    }

}