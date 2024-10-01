import { Aula } from "../model/Postagem/Aula";
import { CursoExterno } from "../model/Postagem/CursoExterno";
import { CursoInterno } from "../model/Postagem/CursoInterno";
import { Postagem } from "../model/Postagem/Postagem";
import { Usuario } from "../model/Usuario";

export let listaUsuarios:Usuario[]
export let listaAula:Aula[]
export let listaCursoExterno:CursoExterno[]
export let listaCursoInterno:CursoInterno[]
export let listaPostagem:Postagem[]

/**
 * IDsRemovidos
 * 
 * Organiza todas as listas de IDsRemovidos para cadas classes
 * tem a seguinte estrutura:
 * Map<nome da classe, numero de ids da classe Já Removidos>
 * @type {Map<string, number>}
 * 
 */
export let IDsRemovidos: Map<string, number> = new Map<string, number>
//Definindo as chaves
IDsRemovidos.set('Usuario',0)
IDsRemovidos.set('Aula',0)
IDsRemovidos.set('CursoExterno',0)
IDsRemovidos.set('CursoInterno',0)
IDsRemovidos.set('Postagem',0)

export function addIDsRemovidos(classe:string, nEspecifico?:number){
    let teste = IDsRemovidos.get(classe)
    if(nEspecifico){
        if(!teste){
            throw new Error(`Erro em addIDsRemovidos(${classe})`);
            
        } else{
            IDsRemovidos.set('Usuario', teste+ nEspecifico)
        }
    
    } else if(!teste){
        throw new Error(`Erro em addIDsRemovidos(${classe}, ${nEspecifico? nEspecifico : 'nullo'})`);
        
    } else{
        IDsRemovidos.set('Usuario', teste++)
    }

}

