import { RedeMain } from "../../Controlers/RedeMain";
import { Usuario } from "../Usuario";
import { Postagem } from "./Postagem";



export class CursoExterno extends Postagem{
    private fontes:string[]
    

    constructor(redeMain:RedeMain, IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], fontes:string[],cargaHoraria?:number){
        super(redeMain, IDPostagem,IDUsuario,titulo,descricao,anexos,cargaHoraria)
        this.fontes = fontes
    }

    getPostagem(usuario: Usuario):string | object{
        if(usuario.getListagemTipo() == "Linhas"){
        return `ID da postagem:   ${this.getIDPostagem()} ${this.getDataCriacao()}\n`
             + `Carga Horaria     ${this.getCargaHoraria()}\n`
             + `Titulo:           ${this.getTitulo()}\n`
             + `Descricao:        ${this.getDescricao()}\n`
             + `Fontes:           ${this.fontes}\n`
             + `Anexos            ${this.getAnexos()}\n`
             + `Likes:            ${this.getLikes()}  Deslikes: ${this.getDeslikes()}`
        }else if(usuario.getListagemTipo() == "Tabelas"){
            return {
                ID: this.getIDPostagem(),
                Data: this.getDataCriacao(),
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

    getFontes():string[]{
        return this.fontes
    }

    alterarCargaHoraria(novaCargaHoraria:number){
        const findUS = this.redeMain.getUsuarioByID(this.getIDUsuario());
        if(findUS){
            this.setCargaHoraria(findUS,novaCargaHoraria);
        } else{
            throw new Error(`Erro em CurosExterno.alterarCargaHoraria(${novaCargaHoraria})`);
        }
    }

    alterarFontes(novasFontes:string[]){
        this.fontes = novasFontes
    }



}