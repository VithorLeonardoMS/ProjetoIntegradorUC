import { RedeMain } from "../../Controlers/RedeMain";
import { Usuario } from "../Usuario";
import { Postagem } from "./Postagem";


export class Aula extends Postagem{
    private IDPostagemReferencia: number;

    constructor(redeMain:RedeMain, IDPostagem:number, IDUsuario:number, titulo:string, descricao:string, data:string, anexos:string[], ID:number, IDPostagemReferencia:number, cargaHoraria?:number){
        super(redeMain, IDPostagem,IDUsuario,titulo,descricao,anexos, cargaHoraria)
        this.IDPostagemReferencia = IDPostagemReferencia
    }

    getPostagem(usuario:Usuario):string | object{
        if(usuario.getListagemTipo() == "Linhas"){
            return `ID da Aula:       ${this.getIDPostagem()} ${this.getDataCriacao()}\n`
                + `Carga Horaria:     ${this.getCargaHoraria()}\n`
                + `ID do Curso:      ${this.IDPostagemReferencia}`
                + `Titulo:           ${this.getTitulo()}\n`
                + `Descricao:        ${this.getDescricao()}\n`
                + `Anexos            ${this.getAnexos()}\n`
                + `Likes:            ${this.getLikes()}  Deslikes: ${this.getDeslikes()}`
        } else if(usuario.getListagemTipo() == "Tabelas"){
            return {
                ID: this.getIDPostagem(),
                Data: this.getDataCriacao(),
                CargaHoraria: this.getCargaHorariaTable(),
                Titulo: this.getTitulo(),
                Descricao: this.getDescricao(),
                Likes: this.getLikes(),
                Deslikes: this.getDeslikes(),

                }

        } else{
            throw new Error(`Erro em getPostagem(${usuario})`)
        }
    }

    alterarCargaHoraria(usuario:Usuario, novaCargaHoraria:number){
        this.setCargaHoraria(usuario, novaCargaHoraria)
    }
}