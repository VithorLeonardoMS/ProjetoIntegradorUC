import { listaUsuarios } from "../Utils/Variaveis"
import { Postagem } from "./Postagem/Postagem"
import { Resposta } from "./Resposta"
import { Usuario } from "./Usuario"

var leitor = require('readline-sync')

export class Comentario {
    public likes: number = 0
    public deslikes: number = 0
    public IDUsuario: number
    public IDComentario: number
    public IDPostagem: number
    public comentarioString:string
    public respostas: Resposta[] = []
    public idsRemovResp:number = 0
   
    constructor(IDUsuario, IDComentario: number, IDPostagem: number, comentarioString:string) {
        this.comentarioString = comentarioString
        this.IDUsuario = IDUsuario
        this.IDComentario = IDComentario
        this.IDPostagem = IDPostagem
    }

    getComentarioSimples():string{
        return(`
        ID_Comentario: ${this.IDComentario}
        ${this.comentarioString}
        Likes: ${this.likes}    Deslikes: ${this.deslikes}`);
    }

    getComentRespostas():string{
        return this.respostas.reduce((acumulador,respostaAtual)=> {return acumulador += respostaAtual.getRespostaSimples()},'')
    }
    //usuario externo respondendo o comentário atual
    responderThis(idUsRespondendo:number, respString?:string): void {
        let respostaString:string = ''
        if(!respString){
            respostaString = leitor.question(`Digite o comentario: @${listaUsuarios.find(usAtual => usAtual.IDUsuario === idUsRespondendo)?.nome/*UsRespndo.nome */} `)
            
        } else {
            respostaString = respString
        }
        let resposta = new Resposta(idUsRespondendo,this.definirIDResp(),this.IDPostagem,this.IDComentario,respostaString)
        this.respostas.push(resposta)
    }
    /**
     * responderResposta() -> Responde uma outra resposta, armazena ambas no comentário principal, mas ainda referência a resposta respondida
     * @param {number} idResposta  -> ID da resposta que será respondida
     * @param {number} idUsRespondendo:number  -> ID do usuario que está respondendo a resposta
     */
    responderResposta(idResposta:number,idUsRespondendo:number, comentString?:string):void{
        let findComent = this.respostas.find(respAtual => respAtual.IDComentario == idResposta)
        let resposta:string
        if(!comentString){
            resposta = leitor.question(`Digite o comentario: @${listaUsuarios.find(usAtual => usAtual.IDUsuario === findComent?.IDUsuario)?.nome} `)

        } else{
            resposta = comentString
        }
        this.respostas.push(new Resposta(idUsRespondendo,this.definirIDResp(), this.IDPostagem,this.IDComentario, resposta))
    }

    darLikeComent():void{
        this.likes++
    }

    darDeslikeComent(usuarioPortador:Usuario):void{
        
    }

    respostaLike(usuario:Usuario, idResposta:number):void {
        usuario.
    }
    respostaDeslike(): void {

    }

    private definirIDResp():number{
        return this.respostas.length + this.idsRemovResp
    }

}

