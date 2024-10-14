
import { redeMain } from "../../Index";
import { Comentario } from "./Comentario";

let rl = require('readline-sync')

export class Resposta{
    private likes: number = 0
    private deslikes: number = 0
    private IDUsuario: number
    private IDRespondido:number
    /**
     * IDComentario é um extenção do IDComentario só que para resposta, 
     * na verdade a resposta é apenas um comentário só que não armazena outras respostas dentro
     */
    private IDComentario: number
    private IDPostagem: number
    private respostaString:string

    constructor(IDUsuario:number, IDComentario:number, IDPostagem:number, IDRespondido:number, respostaString:string){
        this.IDRespondido = IDRespondido
        this.IDUsuario = IDUsuario;
        this.IDComentario = IDComentario
        this.IDPostagem = IDPostagem
        this.respostaString = respostaString
    }

    getLikes():number{return this.likes}

    getDeslikes():number{return this.deslikes}

    getIDUsuario():number{return this.IDUsuario}

    getIDRespondido():number{return this.IDRespondido}

    getIDComentario():number{return this.IDComentario}

    getIDPostagem():number{return this.IDPostagem}
    
    getRespostaSimples():string{
        return(`
        ${redeMain.getListaUsuarios().find(usuarioAtual => usuarioAtual.getIDUsuario() == this.IDUsuario)?.getNome(),this.IDUsuario}
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