import { Comentario } from "./Comentario"
import { Aula } from "./Postagem/Aula"
import { CursoExterno } from "./Postagem/CursoExterno"
import { CursoInterno } from "./Postagem/CursoInterno"
import { Postagem } from "./Postagem/Postagem"
import { Resposta } from "./Resposta"


export class Usuario {
    public nome: string
    public IDUsuario: number
    public email: string
    private senha: string
    public listaLikes:Map<string,Map<number,number>> = new Map<string,Map<number, number>>
    public listaDeslikes:Map<string, number[]> = new Map<string,number[]>
    constructor(nome: string, IDUsuario: number, email: string, senha: string) {
        this.nome = nome
        this.IDUsuario = IDUsuario
        this.email = email
        this.senha = senha
        this.listaLikes.set('Postagem', new Map())
        this.listaLikes.set('Aula', new Map())
        this.listaLikes.set('CursoInterno', new Map())
        this.listaLikes.set('CursoExterno', new Map())
        this.listaLikes.set('Comentario', new Map())
        this.listaLikes.set('Resposta', new Map())
    }

    alterarSenha(senhaNova: string,senhaVerifica:string):void{
        if(this.senha === senhaVerifica ){
            this.senha === senhaNova
        }
    }
    
    alterarNome(novoNome:string,senhaVerifica:string): void{
        if(this.senha === senhaVerifica ){
            this.nome === novoNome
        }
    }

    alterarEmail(novoEmail:string,senhaVerifica:string): void{
        if(this.senha === senhaVerifica ){
            this.email === novoEmail
        }
    }

    likeComent(comentario:Comentario,IDPertencente:number):void{
        comentario.darDeslikeComent(this)
        this.processarLike(comentario,IDPertencente)
    }

    processarLike(classe:Comentario | CursoExterno | CursoInterno | Aula | Postagem, IDChave:number):void{
        if(classe instanceof Comentario){
            this.listaLikes.forEach( (value,key)=> {
                if(key === 'Comentarios'){
                    value.set(IDChave,classe.IDComentario)
                }
            }); 
        } else if(classe instanceof CursoExterno){
            this.listaLikes.forEach( (value,key)=> {
                if(key === 'CursoExterno'){
                    value.set(IDChave,classe.IDPostagem)
                }
            }); 
        }else if(classe instanceof CursoInterno){
            this.listaLikes.forEach( (value,key)=> {
                if(key === 'CursoInterno'){
                    value.set(IDChave,classe.IDPostagem)
                }
            }); 
        }else if(classe instanceof Aula){
            this.listaLikes.forEach( (value,key)=> {
                if(key === 'Aula'){
                    value.set(IDChave,classe.IDPostagem)
                }
            }); 
        }else if(classe instanceof Postagem){
            this.listaLikes.forEach( (value,key)=> {
                if(key === 'Postagem'){
                    value.set(IDChave,classe.IDPostagem)
                }
            }); 
        }
    }

    verificarLike(chave:string,IDChave:number,IDValor:number):boolean{
        return this.listaLikes.get(chave)?.get(IDChave) === IDValor
    }
}