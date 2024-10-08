import { Usuario } from "../Usuario";
import { Aula } from "./Aula";
import { Postagem } from "./Postagem";


export class CursoInterno extends Postagem{
    public aulas:Aula[]

    constructor(IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], cargaHoraria:number){
        super(IDPostagem,titulo,descricao,anexos)
        this.cargaHoraria = cargaHoraria
    }
    getPostagem(usuario: Usuario):string | object{
        if(usuario.getListagemTipo() == "Linhas")
        return `IDpostagem:       ${this.IDPostagem} ${this.getUltimaAlteracao()}\n`
             + `Carga Horaria     ${this.cargaHoraria}\n`
             + `Titulo:           ${this.titulo}\n`
             + `Descricao:        ${this.descricao}\n`
             + `Anexos            ${this.anexos}\n`
             + `Likes:            ${this.likes}  Deslikes: ${this.deslikes}`
        else if(usuario.getListagemTipo() == "Tabelas"){
            return {
                ID: this.IDPostagem,
                Data: this.datas[0],
                CargaHoraria: this.cargaHoraria,
                Titulo: this.titulo,
                Descricao: this.descricao,
                Likes: this.likes,
                Deslikes: this.deslikes
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
            return cargaHorariaTotal + valorAtual.cargaHoraria
        },0)
    }
}