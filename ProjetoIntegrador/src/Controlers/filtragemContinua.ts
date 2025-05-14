import { Comentario } from "../classes/Comentario";
import { Aula } from "../classes/Postagem/Aula";
import { CursoExterno } from "../classes/Postagem/CursoExterno";
import { CursoInterno } from "../classes/Postagem/CursoInterno";
import { Postagem } from "../classes/Postagem/Postagem";
import { Resposta } from "../classes/Resposta";
import { Usuario } from "../classes/Usuario";

const rl = require("readline-sync")

export function filtragemContinua(lista: Postagem[] | CursoExterno[] | CursoInterno[] | Aula[] | Comentario[] | Resposta[], usuario:Usuario):void{

    let teste = true
    let visiveis:number = 10

    while(teste){
        let listaAtual: any[] = lista.slice(0,visiveis);
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