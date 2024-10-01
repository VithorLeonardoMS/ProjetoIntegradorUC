import { Comentario } from "../model/Comentario";
import { Aula } from "../model/Postagem/Aula";
import { CursoExterno } from "../model/Postagem/CursoExterno";
import { CursoInterno } from "../model/Postagem/CursoInterno";
import { Postagem } from "../model/Postagem/Postagem";
import { Resposta } from "../model/Resposta";
import { IDsRemovidos, addIDsRemovidos, listaAula, listaCursoExterno, listaCursoInterno, listaPostagem } from "./Variaveis";


export function removerPost(objeto: CursoExterno | CursoInterno | Aula | Postagem ):boolean{
    if(objeto instanceof CursoExterno){
        let idsRemTest = IDsRemovidos.get('CursoExterno')
        addIDsRemovidos('CursoExterno')
        if(listaCursoExterno.indexOf(objeto)){
            listaCursoExterno.splice(listaCursoExterno.indexOf(objeto),1)
            return true
        } 
    } else if(objeto instanceof CursoInterno){
        let idsRemTest = IDsRemovidos.get('CursoInterno')
        addIDsRemovidos('CursoInterno')
        if(listaCursoInterno.indexOf(objeto)){
            listaCursoInterno.splice(listaCursoInterno.indexOf(objeto),1)
            return true
        }
    } else if(objeto instanceof Aula){
        let idsRemTest = IDsRemovidos.get('Aula')
        addIDsRemovidos('Aula')
        if(listaAula.indexOf(objeto)){
            listaAula.splice(listaAula.indexOf(objeto),1)
            return true
        }
    }  else if(objeto instanceof Postagem){
        let idsRemTest = IDsRemovidos.get('Postagem')
        addIDsRemovidos('Postagem')
        if(listaPostagem.indexOf(objeto)){
            listaPostagem.splice(listaPostagem.indexOf(objeto),1)
            return true
        }
    }
    return false
}