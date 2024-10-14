import { redeMain } from "../../Index"
import { RedeMain } from "../Controlers/RedeMain"
import { Postagem } from "./Postagem/Postagem"
import { Resposta } from "./Resposta"
import { Usuario } from "./Usuario"

var rl = require('readline-sync')

export class Comentario {
    private redeMain:RedeMain
    private likes: number = 0
    private deslikes: number = 0
    private IDUsuario: number
    private findUs:Usuario
    private IDComentario: number
    private IDPostagem: number
    private comentarioString:string
    private respostas: Resposta[] = []
    private idsRemovResp:number = 0
    private ultimaData:string

    constructor(redeMain:RedeMain,IDUsuario:number, IDComentario: number, IDPostagem: number, comentarioString:string) {
        const date = new Date()
        this.ultimaData = `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
        this.comentarioString = comentarioString
        this.IDUsuario = IDUsuario
        this.IDComentario = IDComentario
        this.IDPostagem = IDPostagem
        let testeFind = redeMain.getUsuarioByID(IDUsuario)
        if(testeFind) {this.findUs = testeFind} else{
            throw new Error(`Usuario com id: ${IDUsuario} não encontrado em new Comentario(IDUS: ${IDUsuario}, IDComent: ${IDComentario}) `)
        }
    }

    getLikes():number{return this.likes}

    getDeslikes():number{return this.deslikes}

    getIDUsuario():number{return this.IDUsuario}

    getIDComentario():number{return this.IDComentario}

    getIDPostagem():number{return this.IDPostagem}

    getComentarioString():string{return this.comentarioString}

    getRespostas():Resposta[]{return this.respostas}

    getUltimaData():string{return this.ultimaData}

    getUsuario():Usuario{return this.findUs}

    protected getIdsRemovResp():number{return this.idsRemovResp}

    getComentario():string{
            return    `Data: ${this.ultimaData} \n`
                    + `Usuario: ${this.findUs.getNome()}\n`
                    + `ID_Comentario: ${this.IDComentario}`
                    + `${this.comentarioString}\n`
                    + `Likes: ${this.likes}\n`    
                    + `Deslikes: ${this.deslikes}`
    }

    getComentRespostas():string{
        return this.respostas.reduce((acumulador,respostaAtual)=> {return acumulador += respostaAtual.getResposta()},'')
    }
    //usuario externo respondendo o comentário atual
    responderThis(idUsRespondendo:number, respString?:string): void {
        let respostaString:string = ''
        if(!respString){
            respostaString = rl.question(`Digite o comentario: @${redeMain.getListaUsuarios().find(usAtual => usAtual.getIDUsuario() === idUsRespondendo)?.getNome()/*UsRespndo.nome */} `)
            
        } else {
            respostaString = respString
        }
        let resposta = new Resposta(idUsRespondendo,this.definirIDResp(),this.IDPostagem,this,respostaString)
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
        this.respostas.push(new Resposta(idUsRespondendo,this.definirIDResp(), this.IDPostagem,this, resposta))
    }

    setComentario(usuario:Usuario, edicaoComentario:string):boolean{
        if(usuario.getLogado()){
            this.comentarioString = edicaoComentario
            const date = new Date()
            this.ultimaData = `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
            return true
        }
        return false
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

