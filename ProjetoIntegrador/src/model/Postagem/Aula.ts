import { Postagem } from "./Postagem";


export class Aula extends Postagem{
    public ID:number
    public IDPostagemReferencia: number;
    public cargaHoraria:number

    constructor(IDPostagem:number, IDUsuario:number, nomeUsuario:string, titulo:string, descricao:string, data:string, anexos:string[], ID:number, IDpostagemReferencia:number){
        super(IDPostagem,IDUsuario,nomeUsuario,titulo,descricao,data,anexos)
    }

    alterarCargaHoraria(novaCargaHoraria:number){
        this.cargaHoraria = novaCargaHoraria
    }
}