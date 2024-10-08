
import { redeMain } from "../../Index";
import { Comentario } from "./Comentario";

let rl = require('readline-sync')

export class Resposta{
    public likes: number = 0
    public deslikes: number = 0
    public IDUsuario: number
    public IDRespondido:number
    /**
     * IDComentario é um extenção do IDComentario só que para resposta, 
     * na verdade a resposta é apenas um comentário só que não armazena outras respostas dentro
     */
    public IDComentario: number
    public IDPostagem: number
    public respostaString:string

    constructor(IDUsuario:number, IDComentario:number, IDPostagem:number, IDRespondido:number, respostaString:string){
        this.IDRespondido = IDRespondido
        this.IDUsuario = IDUsuario;
        this.IDComentario = IDComentario
        this.IDPostagem = IDPostagem
        this.respostaString = respostaString
    }
    getRespostaSimples():string{
        return(`
        ${redeMain.listaUsuarios.find(usuarioAtual => usuarioAtual.getIDUsuario() == this.IDUsuario)?.getNome(),this.IDUsuario}
        @${this.IDRespondido} ${this.respostaString}
        Likes: ${this.likes}    Deslikes: ${this.deslikes}`)
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

}