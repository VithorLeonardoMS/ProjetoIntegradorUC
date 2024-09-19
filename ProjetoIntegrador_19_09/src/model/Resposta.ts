import { listaUsuarios } from "../Utils/Variaveis";
import { Comentario } from "./Comentario";

let rl = require('readline-sync')

export class Resposta{
    likes: number
    deslikes: number
    IDUsuario: number
    public IDRespondido:number
    IDComentario: number
    IDPostagem: number
    respostaString:string

    constructor(IDUsuario:number, IDComentario:number, IDPostagem:number, IDRespondido:number, respostaString:string){
        this.IDRespondido = IDRespondido
        this.IDUsuario = IDUsuario;
        this.IDComentario = IDComentario
        this.IDPostagem = IDPostagem
        this.respostaString = respostaString
    }
    getRespostaSimples():string{
        return(`
        ${listaUsuarios.find(usuarioAtual => usuarioAtual.IDUsuario == this.IDUsuario)?.nome,this.IDUsuario}
        @${this.IDRespondido} ${this.respostaString}
        Likes: ${this.likes}    Deslikes: ${this.deslikes}`)
    }
    darLikeResp(){
        this.likes++
    }

    darDeslikeResp(){
        this.deslikes++
    }

}