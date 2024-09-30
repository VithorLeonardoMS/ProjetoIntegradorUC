import { Postagem } from "./Postagem";



export class CursoExterno extends Postagem{
    public cargaHoraria:number
    public fontes:string[]

    constructor(IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], cargaHoraria:number, fontes:string[]){
        super(IDPostagem,IDUsuario,nomeUsuario,titulo,descricao,data,anexos)
        this.fontes = fontes
        this.cargaHoraria = cargaHoraria
    }


    alterarCargaHoraria(novaCargaHoraria:number){
        this.cargaHoraria = novaCargaHoraria
    }

    alterarFontes(novasFontes:string[]){
        this.fontes = novasFontes
    }



}