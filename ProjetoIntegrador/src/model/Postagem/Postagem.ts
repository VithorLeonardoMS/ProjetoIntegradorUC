
import { Comentario } from "../Comentario"
import { Resposta } from "../Resposta"
import { Usuario } from "../Usuario"

let date = new Date()


export class Postagem {
    public IDPostagem: number
    public titulo: string
    public descricao: string
    public comentarios: Comentario[]
    public idsRemovComent: number
    public datas: string[]
    public anexos: string[]
    public deslikes: number
    public likes: number
    private cargaHoraria:number | undefined

    constructor(IDPostagem: number, titulo: string, descricao: string, anexos: string[]) {
        let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`
        this.IDPostagem = IDPostagem
        this.titulo = titulo
        this.descricao = descricao
        this.datas.push(dataAtual)
        this.datas.push(dataAtual)//Esta Correto
        this.anexos = anexos

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
                CargaHoraria: this.cargaHorariaTable(),
                Titulo: this.titulo,
                Descricao: this.descricao,
                Likes: this.likes,
                Deslikes: this.deslikes
                }
        } else{
            throw new Error(`Erro em getPostagem(${usuario})`)
        }

    }
    getUltimaAlteracao():string{
        return this.datas[this.datas.length - 1]? this.datas[this.datas.length - 1]: "Data nao encontrada. "
    }

    private cargaHorariaTable():string{
        if(this.cargaHoraria != 0){
            return `${this.cargaHoraria}`
        } else{
           return 'Nullo' 
        }
    }

    dataCriacao(): string {
        return this.dataCriacao[0]
    }

    setCargaHoraria(usuario:Usuario){
        if(usuario.)
    }

    alterarTitulo(novoTitulo: string):void {
        let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`
        this.titulo = novoTitulo
        this.datas.push(dataAtual)
    }

    alterarDescricao(novaDescricao: string):void {
        let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`
        this.descricao = novaDescricao
        this.datas.push(dataAtual)
    }

    alterarAnexos(novosAnexos: string[]):void {
        let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`
        this.anexos = novosAnexos
        this.datas.push(dataAtual)
    }

    addLike():void {
        this.likes++
    }

    rmLike():void{
        this.likes--
    }

    addDeslike():void {
        this.deslikes++
    }

    rmDeslike():void{
        this.deslikes--
    }

    removerComentario(idComentario: number): boolean {
        let findComent = this.comentarios.find(comment => comment.IDComentario === idComentario)
        let indexComent = findComent ? this.comentarios.indexOf(findComent) : false
        if (indexComent) {
            this.comentarios.splice(indexComent, 1)
            this.idsRemovComent++
            return true
        }
        return false
    }

    /**
     * allComents -> retorna todos os comentarios e as respostas dos comentários da postagem
     * @returns {(Comentario | Resposta)[]}
     */

    allComents(): (Comentario | Resposta)[] {
        let retorno: (Comentario | Resposta)[] = []
        this.comentarios.forEach(comentAtual => retorno.concat(comentAtual.respostas))
        return retorno.concat(this.comentarios)
    }

}