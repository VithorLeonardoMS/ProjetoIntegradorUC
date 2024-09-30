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

export let IDsRemovidos = new Map<string,number>

IDsRemovidos.set('Usuarios',0)
IDsRemovidos.set('Aula',0)
IDsRemovidos.set('CursoExterno',0)
IDsRemovidos.set('CursoInterno',0)
IDsRemovidos.set('Postagem',0)
if(IDsRemovidos.get('Usuario'))
