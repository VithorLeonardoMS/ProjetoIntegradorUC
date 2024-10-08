import { Usuario } from "../Usuario";
import { Postagem } from "./Postagem";


export class Aula extends Postagem{
    public ID:number
    public IDPostagemReferencia: number;
    public cargaHoraria:number

    constructor(IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], ID:number, IDpostagemReferencia:number){
        super(IDPostagem,IDUsuario,nomeUsuario,titulo,descricao,data,anexos)
    }

    getPostagem(usuario:Usuario):string | object{
        if(usuario.getListagemTipo() == "Linhas"){
            return `ID da Aula:       ${this.IDPostagem} ${this.getUltimaAlteracao()}\n`
                + `Carga Horaria     ${this.cargaHoraria}\n`
                + `ID do Curso:      ${this.IDPostagemReferencia}`
                + `Titulo:           ${this.titulo}\n`
                + `Descricao:        ${this.descricao}\n`
                + `Anexos            ${this.anexos}\n`
                + `Likes:            ${this.likes}  Deslikes: ${this.deslikes}`
        } else if(usuario.getListagemTipo() == "Tabelas"){
            return {
                ID: this.IDPostagem,
                Data: this.datas[0],
                CargaHoraria: this.cargaHoraria,
                Titulo: this.titulo,
                Descricao: this.descricao,
                Likes: this.likes,
                Deslikes: this.deslikes,

                }

        } else{
            throw new Error(`Erro em getPostagem(${usuario})`)
        }
    }

    alterarCargaHoraria(novaCargaHoraria:number){
        this.cargaHoraria = novaCargaHoraria
    }
}