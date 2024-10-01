import { Comentario } from "../model/Comentario";
import { Aula } from "../model/Postagem/Aula";
import { CursoExterno } from "../model/Postagem/CursoExterno";
import { CursoInterno } from "../model/Postagem/CursoInterno";
import { Postagem } from "../model/Postagem/Postagem";
import { Resposta } from "../model/Resposta";
import { Usuario } from "../model/Usuario";
import { IDsRemovidos } from "./Variaveis";



    function definirNovoID(lista:Comentario[] | Resposta[] | Usuario[] | Aula[] | CursoExterno[] | CursoInterno[] | Postagem[], idsRemovidos?:number):number{

        if((lista[0] instanceof Resposta || lista[0] instanceof Comentario) && idsRemovidos){
            return lista.length + idsRemovidos
        } else if(lista[0] instanceof Usuario){
            let retorno = IDsRemovidos.get('Usuarios')
            return (retorno? retorno:0) + lista.length
        } else if(lista[0] instanceof Aula){
            let retorno = IDsRemovidos.get('Aula')
            return (retorno? retorno:0) + lista.length
        } else if(lista instanceof Usuario){// ver se lista é analizada corretamente pois é uma array
            let retorno = IDsRemovidos.get('Usuarios')
            return (retorno? retorno:0) + lista.length  
        } else if(lista[0] instanceof Usuario){
            let retorno = IDsRemovidos.get('Usuarios')
            return (retorno? retorno:0) + lista.length
        } else if(lista[0] instanceof Usuario){
            let retorno = IDsRemovidos.get('Usuarios')
            return (retorno? retorno:0) + lista.length
        } else{
            throw new Error(`Erro em definirNovoID(${lista}, ${idsRemovidos})`);
            return -1
        }

    }