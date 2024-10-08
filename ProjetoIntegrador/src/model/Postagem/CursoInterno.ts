import { Aula } from "./Aula";
import { Postagem } from "./Postagem";


export class CursoInterno extends Postagem{
    public cargaHoraria:number
    public aulas:Aula[]

    constructor(IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], cargaHoraria:number){
        super(IDPostagem,IDUsuario,nomeUsuario,titulo,descricao,data,anexos)
        this.cargaHoraria = cargaHoraria
    }
    getPostagem():string{
        return `IDpostagem:       ${this.IDPostagem} ${this.getUltimaAlteracao()}\n`
             + `Carga Horaria     ${this.cargaHoraria}\n`
             + `Titulo:           ${this.titulo}\n`
             + `Descricao:        ${this.descricao}\n`
             + `Anexos            ${this.anexos}\n`
             + `Likes:            ${this.likes}  Deslikes: ${this.deslikes}`
    }

    novaAula(aula:Aula):void{
        this.aulas.push(aula)
    }

    cagaHorariaAutomatica():number{
        return this.aulas.reduce((cargaHorariaTotal,valorAtual)=>{
            return cargaHorariaTotal + valorAtual.cargaHoraria
        },0)
    }
}