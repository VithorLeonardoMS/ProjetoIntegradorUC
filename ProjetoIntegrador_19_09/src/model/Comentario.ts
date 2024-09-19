import { listaUsuarios } from "../Utils/Variaveis"
import { Postagem } from "./Postagem/Postagem"
import { Resposta } from "./Resposta"
import { Usuario } from "./Usuario"

var leitor = require('readline-sync')

export class Comentario {
    likes: number
    deslikes: number
    IDUsuario: number
    IDComentario: number
    IDPostagem: number
    comentarioString:string
    respostas: Resposta[] = []
    idsRemovResp:number
   
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

    responderComent(): void {
        let resposta = leitor.question(`Digite o comentario: @${listaUsuarios.find(usAtual => usAtual.IDUsuario === this.IDUsuario)?.nome} `)
        resposta = new Resposta(this.IDUsuario,this.respostas.length,this.IDPostagem,resposta)
        this.respostas.push(resposta)
    }

    responderResposta(idComentario:number):void{
        let findComent = this.respostas.find(respAtual => respAtual.IDComentario == idComentario)
        let reposta = leitor.question(`Digite o comentario: @${listaUsuarios.find(usAtual => usAtual.IDUsuario === findComent?.IDUsuario)?.nome} `)
        this.respostas.push(new Resposta(this.IDUsuario,this.respostas.length, this.IDPostagem,this.IDComentario ,reposta))
    }

    darLikeComent():void{
        this.likes++
    }

    darDeslikeComent(usuarioPortador:Usuario){
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


}

