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
     * Postslikes
     * lista todos os likes dados pelo usuário, usando um map, que organiza as informações da seguinte forma:
     * Map<Tipo da postagem, [IDs das postagens] >
     * @type {Map<string,number[]>}
     * Mesma regra para postsDeslikes
     * 
     */
    public postsLikes: Map<string, number[]> = new Map<string, number[]>
    public postsDeslikes: Map<string, number[]> = new Map<string, number[]>
    /** 
    * comentsLikes
    * lista todos os likes dados nos comentários de todas as publicões, organiza as informações da seguinte forma:
    * Map<[Map<IDPostagem, IDComentarios[]]>
    * @type {Map<number, number[]>}
    * Mesma regra para comentsDeslikes
    * 
    */
    public comentsLikes: Map<number, number[]>
    public comentsDeslikes:Map<number, number[]>

    constructor(nome: string, IDUsuario: number, email: string, senha: string) {
        this.nome = nome
        this.IDUsuario = IDUsuario
        this.email = email
        this.senha = senha
        this.postsLikes.set('Postagem', [])
        this.postsLikes.set('Aula', [])
        this.postsLikes.set('CursoInterno', [])
        this.postsLikes.set('CursoExterno', [])
        this.postsLikes.set('Comentario', [])
        this.postsLikes.set('Resposta', [])
    }

    alterarSenha(senhaNova: string, senhaVerifica: string): void {
        if (this.senha === senhaVerifica) {
            this.senha === senhaNova
        }
    }

    alterarNome(novoNome: string, senhaVerifica: string): void {
        if (this.senha === senhaVerifica) {
            this.nome === novoNome
        }
    }

    alterarEmail(novoEmail: string, senhaVerifica: string): void {
        if (this.senha === senhaVerifica) {
            this.email === novoEmail
        }
    }

    likeComent(comentario: Comentario): void {
        comentario.darDeslikeComent(this)
        this.processarLike(comentario)
    }
    /**
     * processarLike() -> Adiciona todos os likes feitos pelo usuário no banco de dados, que é estruturado com Map,
     * isso possibilita identificar se o like já foi dado ou não no objeto especifico, além disso, se o like já foi dado ele o retira do banco.
     * @param {Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta} objeto -> É
     * o objeto que receberá o like.
     * @returns {boolean} Se o like for dado retorna true, se for retirado retorna false.
     */
    processarLike(objeto: Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta): boolean {
        if (objeto instanceof Comentario || objeto instanceof Resposta) {
            //ID que será a chave no map dos comentários
            let IDChave = objeto.IDPostagem
            //Se a chave não existir adiciona a chave
            if(!this.comentsLikes.has(IDChave)){{
                this.comentsLikes.set(IDChave, [objeto.IDComentario])
                }
            //Se existir verifica-o
            } else {
                this.comentsLikes.forEach((value, key) => {
                    if (key === IDChave) {
                        //Se IDChave já exitir remove-o, assim retirando o like
                        if (value.indexOf(IDChave) > -1) {
                            value.splice(value.indexOf(IDChave), 1)
                            //Se não existir o adiciona
                        } else {
                            value.push(objeto.IDComentario)
                            return true
                        }
                    }
                });
            }
            return false
        } else if (objeto instanceof CursoExterno) {
            this.postsLikes.forEach((value, key) => {
                if (key === 'CursoExterno') {
                    if (value.indexOf(objeto.IDPostagem) > -1) {
                        value.splice(value.indexOf(objeto.IDPostagem), 1)
                    } else {
                        value.push(objeto.IDPostagem)
                        return true
                    }
                }
            });
            return false
        } else if (objeto instanceof CursoInterno) {
            this.postsLikes.forEach((value, key) => {
                if (key === 'CursoInterno') {
                    if (value.indexOf(objeto.IDPostagem) > -1) {
                        value.splice(value.indexOf(objeto.IDPostagem), 1)
                    } else {
                        value.push(objeto.IDPostagem)
                        return true
                    }
                }
            });
            return false
        } else if (objeto instanceof Aula) {
            this.postsLikes.forEach((value, key) => {
                if (key === 'Aula') {
                    if (value.indexOf(objeto.IDPostagem) > -1) {
                        value.splice(value.indexOf(objeto.IDPostagem), 1)
                    } else {
                        value.push(objeto.IDPostagem)
                        return true
                    }
                }
            });
            return false
        } else if (objeto instanceof Postagem) {
            this.postsLikes.forEach((value, key) => {
                if (key === 'Postagem') {
                    if (value.indexOf(objeto.IDPostagem) > -1) {
                        value.splice(value.indexOf(objeto.IDPostagem), 1)
                    } else {
                        value.push(objeto.IDPostagem)
                        return true
                    }
                }
            });
            return false
        } else {
            throw new Error(`instanceof para argumento "classe" não encontrada em processarLike(${objeto})`)
        }
    }

    verificarLike(objeto: Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta): boolean {
        if (objeto instanceof Comentario || objeto instanceof Resposta) {
            //ID que deve ser a chave no map dos comentários
            let IDChave = objeto.IDPostagem
            if(!this.comentsLikes.has(IDChave)){{
                return false
                }
            } else {
                this.comentsLikes.forEach((value, key) => {
                        if (key === IDChave && value.find(idComentario => idComentario == objeto.IDComentario)) {
                                return true
                        }
                    });
                    return false
            }
        } else if(objeto instanceof CursoExterno){
            
        } else if(objeto instanceof CursoInterno){
            
        } else if(objeto instanceof Aula){
            
        } else if(objeto instanceof Postagem){
            
        }
    }





}