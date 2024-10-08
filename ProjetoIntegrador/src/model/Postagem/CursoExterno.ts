import { Postagem } from "./Postagem";



export class CursoExterno extends Postagem{
    public cargaHoraria:number
    public fontes:string[]
    

    constructor(IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], cargaHoraria:number, fontes:string[]){
        super(IDPostagem,IDUsuario,nomeUsuario,titulo,descricao,data,anexos)
        this.fontes = fontes
        this.cargaHoraria = cargaHoraria
    }

    getPostagem():string{
        return `ID da postagem:   ${this.IDPostagem} ${this.getUltimaAlteracao()}\n`
             + `Carga Horaria     ${this.cargaHoraria}\n`
             + `Titulo:           ${this.titulo}\n`
             + `Descricao:        ${this.descricao}\n`
             + `Fontes:           ${this.fontes}\n`
             + `Anexos            ${this.anexos}\n`
             + `Likes:            ${this.likes}  Deslikes: ${this.deslikes}`
    }

    alterarCargaHoraria(novaCargaHoraria:number){
        this.cargaHoraria = novaCargaHoraria
    }

    alterarFontes(novasFontes:string[]){
        this.fontes = novasFontes
    }



}