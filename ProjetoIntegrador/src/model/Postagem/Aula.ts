import { Postagem } from "./Postagem";


export class Aula extends Postagem{
    public ID:number
    public IDPostagemReferencia: number;
    public cargaHoraria:number

    constructor(IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], ID:number, IDpostagemReferencia:number){
        super(IDPostagem,IDUsuario,nomeUsuario,titulo,descricao,data,anexos)
    }

    getPostagem():string{
        return `ID da Aula:       ${this.IDPostagem} ${this.getUltimaAlteracao()}\n`
             + `Carga Horaria     ${this.cargaHoraria}\n`
             + `ID do Curso:      ${this.IDPostagemReferencia}`
             + `Titulo:           ${this.titulo}\n`
             + `Descricao:        ${this.descricao}\n`
             + `Anexos            ${this.anexos}\n`
             + `Likes:            ${this.likes}  Deslikes: ${this.deslikes}`
    }

    alterarCargaHoraria(novaCargaHoraria:number){
        this.cargaHoraria = novaCargaHoraria
    }
}