import { Aula } from "./Aula";
import { Postagem } from "./Postagem";


export class CursoInterno extends Postagem{
    public cargaHoraria:number
    public aulas:Aula[]

    constructor(IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], cargaHoraria:number){
        super(IDPostagem,IDUsuario,nomeUsuario,titulo,descricao,data,anexos)
        this.cargaHoraria = cargaHoraria
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