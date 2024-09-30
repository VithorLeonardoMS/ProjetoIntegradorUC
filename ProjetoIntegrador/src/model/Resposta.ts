import { listaUsuarios } from "../Utils/Variaveis";
import { Comentario } from "./Comentario";

let rl = require('readline-sync')

export class Resposta{
    public likes: number = 0
    public deslikes: number = 0
    public IDUsuario: number
    public IDRespondido:number
    public IDResposta: number
    public IDPostagem: number
    public respostaString:string

    constructor(IDUsuario:number, IDResposta:number, IDPostagem:number, IDRespondido:number, respostaString:string){
        this.IDRespondido = IDRespondido
        this.IDUsuario = IDUsuario;
        this.IDResposta = IDResposta
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