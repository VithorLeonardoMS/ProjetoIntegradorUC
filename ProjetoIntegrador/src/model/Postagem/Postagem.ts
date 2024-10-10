
import { RedeMain } from "../../Controlers/RedeMain"
import { Comentario } from "../Comentario"
import { Resposta } from "../Resposta"
import { Usuario } from "../Usuario"

let date = new Date()


export class Postagem {
    protected redeMain:RedeMain
    private IDPostagem: number
    private IDUsuario: number
    private titulo: string
    private descricao: string
    private comentarios: Comentario[]
    private idsRemovComent: number
    private datas: string[]
    private anexos: string[]
    private deslikes: number
    private likes: number
    private cargaHoraria:number | undefined
    private criador:Usuario

    constructor(redeMain:RedeMain, IDPostagem: number, IDUsuario:number, titulo: string, descricao: string, anexos: string[], cargaHoraria?:number) {
        let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`
        this.IDPostagem = IDPostagem
        this.IDUsuario = IDUsuario
        this.titulo = titulo
        this.descricao = descricao
        this.datas.push(dataAtual)
        this.datas.push(dataAtual)//Esta Correto
        this.anexos = anexos
        this.cargaHoraria = cargaHoraria
        const findUS = redeMain.getUsuario(IDUsuario)
        if(findUS){
            this.criador = findUS
        } else{
            throw new Error(`Erro em (postagem ou super)->constructor()->findUs é undefined->Usuario com ID: ${IDUsuario} não encontrado`);
        }

    }

    protected verificarUS():boolean{
        return this.criador.getLogado()
    }

    getPostagem(usuario:Usuario):string | object{
        if(usuario.getListagemTipo() == "Linhas"){
            return `ID:       ${this.IDPostagem} ${this.getUltimaAlteracao()}\n`
                + `Titulo:           ${this.titulo}\n`
                + `Descricao:        ${this.descricao}\n`
                + `Anexos:           ${this.anexos}`
                + `Likes:            ${this.likes}  Deslikes: ${this.deslikes}`
        } else if(usuario.getListagemTipo() == "Tabelas"){
            return {
                ID: this.IDPostagem,
                Data: this.datas[0],
                CargaHoraria: this.getCargaHorariaTable(),
                Titulo: this.titulo,
                Descricao: this.descricao,
                Likes: this.likes,
                Deslikes: this.deslikes
                }
        } else{
            throw new Error(`Erro em getPostagem(${usuario})`)
        }

    }

    public getIDPostagem():number{ return this.IDPostagem}

    public getIDUsuario():number{return this.IDUsuario}

    public getTitulo():string{return this.titulo}

    public getDescricao():string{return this.descricao}

    public getComentarios():Comentario[]{return this.comentarios}

        /**
     * getAllComents -> retorna todos os comentarios e as respostas dos comentários da postagem
     * @returns {(Comentario | Resposta)[]}
     */

    getAllComents(): (Comentario | Resposta)[] {
        let retorno: (Comentario | Resposta)[] = []
        this.comentarios.forEach(comentAtual => retorno.concat(comentAtual.getRespostas()))
        return retorno.concat(this.comentarios)
    }

    protected getIdsRemovidosComents():number{return this.idsRemovComent}

    public getAnexos():string[]{return this.anexos}

    public getLikes():number{return this.likes}

    public getDeslikes():number{return this.deslikes}

    public getCargaHoraria():number | undefined{return this.cargaHoraria}

    protected getCargaHorariaTable():string{
        if(this.cargaHoraria != 0){
            return `${this.cargaHoraria}`
        } else{
           return '' 
        }
    }

    protected getCargaHorariaString(){
        if(this.cargaHoraria != 0){
            return `${this.cargaHoraria}`
        } else{
           return 'nullo' 
        }
    }
    public getDatas():string[]{return this.datas}

    getUltimaAlteracao():string{
        return this.datas[this.datas.length - 1]? this.datas[this.datas.length - 1]: "Data nao encontrada. "
    }



    getDataCriacao(): string {
        return this.datas[0]
    }

    setCargaHoraria(usuario:Usuario, novaCargaHoraria:number){
        if(usuario.getLogado() && usuario.getIDUsuario() == this.IDPostagem){
            this.cargaHoraria = novaCargaHoraria
        } else{
            throw new Error(`erro em setCargahoraria(${usuario}, ${novaCargaHoraria})`)
        }
    }

    setTitulo(novoTitulo: string):void {
        let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`
        this.titulo = novoTitulo
        this.datas.push(dataAtual)
    }

    setDescricao(novaDescricao: string):void {
        let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`
        this.descricao = novaDescricao
        this.datas.push(dataAtual)
    }

    setNewAnexos(novosAnexos:string[]){
        this.anexos = novosAnexos
    }

    addAnexos(novosAnexos: string[]):void {
        let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`
        this.anexos = novosAnexos
        this.datas.push(dataAtual)
    }
    addDeslike():void {
        this.deslikes++
    }

    addLike():void {
        this.likes++
    }

    rmLike():void{
        this.likes--
    }

    rmDeslike():void{
        this.deslikes--
    }

    rmComentario(idComentario: number): boolean {
        let findComent = this.comentarios.find(comment => comment.getIDComentario() === idComentario)
        let indexComent = findComent ? this.comentarios.indexOf(findComent) : false
        if (indexComent) {
            this.comentarios.splice(indexComent, 1)
            this.idsRemovComent++
            return true
        }
        return false
    }

}