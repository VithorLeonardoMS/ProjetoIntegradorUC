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
    respostas: Array<Resposta> = []
   
    constructor(IDUsuario, IDComentario: number, IDPostagem: number) {
        this.IDUsuario = IDUsuario
        this.IDComentario = IDComentario
        this.IDPostagem = IDPostagem
    }

    getComentarioSimples():string{
        return(`
        ID_Comentario: ${this.IDComentario}
        Likes: ${this.likes}
        Deslikes: ${this.deslikes}`);
    }

    criarResposta(): void {
        let comentar = leitor.question(`Digite a resposta: `)
        comentar = new Resposta(this.IDPostagem, this.respostas.length)
        this.respostas.push(comentar)
    }

    darLikeComent():void{
        this.likes++
    }

    darDeslikeComent(usuarioPortador:Usuario){
        let teste = usuarioPortador?.IDDeslikes.get('Comentario')?.find(idEncontrado => idEncontrado === this.IDComentario)
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

