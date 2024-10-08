
import { Comentario } from "../Comentario"
import { Resposta } from "../Resposta"
import { Usuario } from "../Usuario"

let date = new Date()
let dataAtual = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`

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

    constructor(IDPostagem: number, titulo: string, descricao: string, data: string, anexos: string[]) {
        this.IDPostagem = IDPostagem
        this.titulo = titulo
        this.descricao = descricao
        this.datas.push(data)
        this.datas.push(data)//Esta correto
        this.anexos = anexos

    }

    getPostagem():string{
        return `IDpostagem:       ${this.IDPostagem} ${this.getUltimaAlteracao()}\n`
             + `Titulo:           ${this.titulo}\n`
             + `Descricao:        ${this.descricao}\n`
             + `Anexos:           ${this.anexos}`
             + `Likes:            ${this.likes}  Deslikes: ${this.deslikes}`
    }

    getUltimaAlteracao():string{
        return this.datas[this.datas.length - 1]? this.datas[this.datas.length - 1]: "Data nao encontrada. "
    }

    dataCriacao(): string {
        return this.dataCriacao[0]
    }

    alterarTitulo(novoTitulo: string):void {
        this.titulo = novoTitulo
        this.datas.push(dataAtual)
    }

    alterarDescricao(novaDescricao: string):void {
        this.descricao = novaDescricao
        this.datas.push(dataAtual)
    }

    alterarAnexos(novosAnexos: string[]):void {
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