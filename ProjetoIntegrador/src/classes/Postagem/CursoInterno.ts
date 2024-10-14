import { RedeMain } from "../../Controlers/RedeMain";
import { Usuario } from "../Usuario";
import { Aula } from "./Aula";
import { Postagem } from "./Postagem";


export class CursoInterno extends Postagem{
    public aulas:Aula[]

    constructor(redeMain:RedeMain, IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], cargaHoraria?:number){
        super(redeMain,IDPostagem,IDUsuario,titulo,descricao,anexos, cargaHoraria)
    }
    getPostagem(usuario: Usuario):string | object{
        if(usuario.getListagemTipo() == "Linhas")
        return `IDpostagem:       ${this.getIDPostagem} ${this.getDataCriacao()}\n`
             + `Carga Horaria     ${this.getCargaHoraria()}\n`
             + `Titulo:           ${this.getTitulo()}\n`
             + `Descricao:        ${this.getDescricao()}\n`
             + `Anexos            ${this.getAnexos()}\n`
             + `Likes:            ${this.getLikes()}  Deslikes: ${this.getDeslikes()}`
        else if(usuario.getListagemTipo() == "Tabelas"){
            return {
                ID: this.getIDPostagem(),
                Data: this.getDatas(),
                CargaHoraria: this.getCargaHoraria(),
                Titulo: this.getTitulo(),
                Descricao: this.getDescricao(),
                Likes: this.getLikes(),
                Deslikes: this.getDeslikes()
                }
        }else{
            throw new Error(`Erro em getPostagem(${usuario})`)
        }
    }

    getNovaAula(aula:Aula):void{
        this.aulas.push(aula)
    }

    cagaHorariaAutomatica():number{
        return this.aulas.reduce((cargaHorariaTotal,valorAtual)=>{
            let somar:number | undefined = valorAtual.getCargaHoraria()
            if(somar){
                return cargaHorariaTotal + somar
            }
            return cargaHorariaTotal 
        },0)
    }
}