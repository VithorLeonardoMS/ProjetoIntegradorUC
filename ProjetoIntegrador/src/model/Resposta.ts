import { Comentario } from "./Comentario";


export class Resposta{
    IDResposta:number
    IDPostagem:number
    likes:number = 0
    deslikes:number = 0
     /**
     * Os tipos dentro dos maps representam respectivamente IDUsuario, IDComentario e IDResposta
     * @type {Map <number,Map <number, number>>}
     * 
     */
     listaLikeRespposta:Map<number,Map<number,number>>

    constructor(ID_Postagem:number, ID_Resposta:number){
        this.IDPostagem = ID_Postagem
        this.IDResposta = ID_Resposta
    }
    getRespostaSimples():string{
        return(`
        ID_Resposta: ${this.IDResposta}
        Likes: ${this.likes}
        Deslikes: ${this.deslikes}`)
    }
    darLikeResp(){
        this.likes++
    }

    darDeslikeResp(){
        this.deslikes++
    }

}