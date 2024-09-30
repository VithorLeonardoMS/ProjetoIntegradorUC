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
    /**
     * Posts likes
     * lista todos os likes dados pelo usuário, usando um map, que organiza as informações da seguinte forma:
     * Map<Tipo da postagem, [IDs da postagens] >
     * 
     */
    public postsLikes:Map<string,number[]> = new Map<string,number[]>
    public postsDeslikes:Map<string,number[]> = new Map<string,number[]>
    
    
    public comentsLikes:Map<string,Map<number,number>> 
    public comentsDeslikes:Map<string,Map<number,number>>
    constructor(nome: string, IDUsuario: number, email: string, senha: string) {
        this.nome = nome
        this.IDUsuario = IDUsuario
        this.email = email
        this.senha = senha
        this.postsLikes.set('Postagem', new Map())
        this.postsLikes.set('Aula', new Map())
        this.postsLikes.set('CursoInterno', new Map())
        this.postsLikes.set('CursoExterno', new Map())
        this.postsLikes.set('Comentario', new Map())
        this.postsLikes.set('Resposta', new Map())
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

    processarLike(classe:Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta, IDChave:number):void{
        if(classe instanceof Comentario){
            this.postsLikes.forEach( (value,key)=> {
                if(key === 'Comentarios'){
                    if(value.indexOf(IDChave) > -1){
                        value.splice(value.indexOf(IDChave),1)
                    } else{
                        value.push(IDChave,classe.IDComentario)
                    }
                }
            }); 
        } else if(classe instanceof CursoExterno){
            this.postsLikes.forEach( (value,key)=> {
                if(key === 'CursoExterno'){
                    value.set(IDChave,classe.IDPostagem)
                }
            }); 
        }else if(classe instanceof CursoInterno){
            this.postsLikes.forEach( (value,key)=> {
                if(key === 'CursoInterno'){
                    value.set(IDChave,classe.IDPostagem)
                }
            }); 
        }else if(classe instanceof Aula){
            this.postsLikes.forEach( (value,key)=> {
                if(key === 'Aula'){
                    value.set(IDChave,classe.IDPostagem)
                }
            }); 
        }else if(classe instanceof Postagem){
            this.postsLikes.forEach( (value,key)=> {
                if(key === 'Postagem'){
                    value.set(IDChave,classe.IDPostagem)
                }
            }); 
        }
    }

    verificarLike(chave:string,IDChave:number,IDValor:number):boolean{
        return this.postsLikes.get(chave)?.get(IDChave) === IDValor
    }
}