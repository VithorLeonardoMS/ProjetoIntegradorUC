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

    responderThis(idUsRespondendo:number): void {//usuario externo respondendo o comentário atual
        let resposta = leitor.question(`Digite o comentario: @${listaUsuarios.find(usAtual => usAtual.IDUsuario === idUsRespondendo)?.nome/*UsRespndo.nome */} `)
        resposta = new Resposta(idUsRespondendo,this.definirIDResp(),this.IDPostagem,this.IDComentario,resposta)
        this.respostas.push(resposta)
    }

    responderResposta(idResposta:number,idUsRespondendo:number):void{//usuario externo respondendo uma das respostas deste comentário

        let findComent = this.respostas.find(respAtual => respAtual.IDResposta == idResposta)
        let reposta = leitor.question(`Digite o comentario: @${listaUsuarios.find(usAtual => usAtual.IDUsuario === findComent?.IDUsuario)?.nome} `)
        this.respostas.push(new Resposta(idUsRespondendo,this.definirIDResp(), this.IDPostagem,this.IDComentario ,reposta))
    }

    darLikeComent():void{
        this.likes++
    }

    darDeslikeComent(usuarioPortador:Usuario):void{
        let teste = usuarioPortador?.listaDeslikes.get('Comentario')?.find(idEncontrado => idEncontrado === this.IDComentario)
        if(teste){
            usuarioPortador

        }
    }

    // respostaLike(IDUsuario:number, idResposta:number):boolean {
    //     const respostaFd = this.respostas.find(respostaAtual=>respostaAtual.IDResposta === idResposta)
    //     const usuarioFd = listaUsuarios.find(usuarioAtual => usuarioAtual.IDUsuario == IDUsuario)
    //     if(usuarioFd?.verificarLike('Resposta',this.IDComentario,this.IDPostagem)){
    //         respostaFd?.darLikeResp()
    //         return true
    //     } else{
    //         return false
    //     }//Problema, o usuario salva uma chave com o id da resposta e o id do comentário, mas aí não é possivel identificar de qual postagem é a resposta do comentário

    //}
    respostaDeslike(): void {
        let opc2 = leitor.question(`Qual comentario voce deseja não curtir (1|2)? `);
        if(opc2 == this.respostas[opc2 - 1]) {
            this.deslikes + 1
        } else {
            console.log('Opção inválida! ')
        }
    }

    private definirIDResp():number{
        return this.respostas.length + this.idsRemovResp
    }

}

