
import { redeMain } from "../../Index";
import { Comentario } from "./Comentario";
import { Usuario } from "./Usuario";

export class Resposta{
    private likes: number = 0
    private deslikes: number = 0
    private IDUsuario: number
    private findUs:Usuario
    private comentResp:Comentario

    /**
     * IDComentario é um extenção do IDComentario só que para resposta, 
     * na verdade a resposta é apenas um comentário só que não armazena outras respostas dentro
     */
    private IDComentario: number
    private IDPostagem: number
    private respostaString:string
    private ultimaData:string

    constructor(IDUsuario:number, IDComentario:number, IDPostagem:number, comentarioRespondido:Comentario, respostaString:string){
        this.comentResp = comentarioRespondido
        this.IDUsuario = IDUsuario;
        this.IDComentario = IDComentario
        this.IDPostagem = IDPostagem
        this.respostaString = `@${comentarioRespondido.getUsuario().getNome()} ` + respostaString
        let testeFind = redeMain.getUsuarioByID(IDUsuario)
        const date = new Date()
        this.ultimaData = `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
        if(testeFind) {this.findUs = testeFind} else{
            throw new Error(`Usuario com id: ${IDUsuario} não encontrado em new Comentario(IDUS: ${IDUsuario}, IDComent: ${IDComentario}) `)
        }
    }

    getLikes():number{return this.likes}

    getDeslikes():number{return this.deslikes}

    getIDUsuario():number{return this.IDUsuario}

    getIDComentario():number{return this.IDComentario}

    getIDPostagem():number{return this.IDPostagem}
    
    getResposta():string{
        return    `Data: ${this.ultimaData} \n`
        + `Usuario: ${this.findUs.getNome()}\n`
        + `ID_Comentario: ${this.IDComentario}`
        + `${this.respostaString}\n`
        + `Likes: ${this.likes}\n`    
        + `Deslikes: ${this.deslikes}`
    }

    setResposta(novaResposta:string,usuario:Usuario):boolean{
        if(usuario.getLogado()){
            this.respostaString = `@${this.comentResp.getUsuario().getNome()} ` + novaResposta
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

}