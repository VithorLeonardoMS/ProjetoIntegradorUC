
export class Aula{

    //protected redeMain!:RedeMain
    private IDPostagem: number
    private IDUsuario: number
    private titulo: string
    private descricao: string
    private comentarios!: Comentario[]
    private idsRemovComent!: number
    private datas!: string[]
    private anexos: string[]
    private deslikes!: number
    private likes!: number
    private cargaHoraria:number | undefined
    private criador:Usuario

    private IDPostagemReferencia: number;

    constructor(){

    }

}