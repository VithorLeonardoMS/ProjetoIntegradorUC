import { redeMain } from "../../Index"
import { Postagem } from "./Postagem/Postagem"
import { Resposta } from "./Resposta"
import { Usuario } from "./Usuario"

var rl = require('readline-sync')

export class Comentario {
    private likes: number = 0
    private deslikes: number = 0
    private IDUsuario: number
    private IDComentario: number
    private IDPostagem: number
    private comentarioString:string
    private respostas: Resposta[] = []
    private idsRemovResp:number = 0
   
    constructor(IDUsuario, IDComentario: number, IDPostagem: number, comentarioString:string) {
        this.comentarioString = comentarioString
        this.IDUsuario = IDUsuario
        this.IDComentario = IDComentario
        this.IDPostagem = IDPostagem
    }

    getLikes():number{return this.likes}

    getDeslikes():number{return this.deslikes}

    getIDUsuario():number{return this.IDUsuario}

    getIDComentario():number{return this.IDComentario}

    getIDPostagem():number{return this.IDPostagem}

    getComentarioString():string{return this.comentarioString}

    getRespostas():Resposta[]{return this.respostas}

    protected getIdsRemovResp():number{return this.idsRemovResp}

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
            respostaString = rl.question(`Digite o comentario: @${redeMain.getListaUsuarios().find(usAtual => usAtual.getIDUsuario() === idUsRespondendo)?.getNome()/*UsRespndo.nome */} `)
            
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
        let findComent = this.respostas.find(respAtual => respAtual.getIDComentario() == idResposta)
        let resposta:string
        if(comentString){
            resposta = comentString
        } else{
            resposta = rl.question(`Digite o comentario: @${redeMain.getListaUsuarios().find(usAtual => usAtual.getIDUsuario() === findComent?.getIDUsuario())?.getNome()} `)
        }
        this.respostas.push(new Resposta(idUsRespondendo,this.definirIDResp(), this.IDPostagem,this.IDComentario, resposta))
    }

    addLikeComent():void{
        this.likes++
    }

    rmLikeComent():void{
        this.likes--
    }

    addDeslikeComent():void{
        this.deslikes++
    }

    rmDeslikeComent():void{
        this.deslikes--
    }

    respostaLike(usuario:Usuario, idResposta:number):void {
        usuario//
    }

    respostaDeslike(): void {

    }

    private definirIDResp():number{
        return this.respostas.length + this.idsRemovResp
    }

    
}

