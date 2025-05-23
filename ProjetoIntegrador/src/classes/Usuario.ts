
import { RedeMain } from "../Controlers/RedeMain"
import { optionSenha } from "../Controlers/optionSenha"
import { Comentario } from "./Comentario"
import { Aula } from "./Postagem/Aula"
import { CursoExterno } from "./Postagem/CursoExterno"
import { CursoInterno } from "./Postagem/CursoInterno"
import { Postagem } from "./Postagem/Postagem"
import { Resposta } from "./Resposta"


export class Usuario {
    private nome: string
    private IDUsuario: number
    private EMail: string
    private senha: string
    private fotoPerfil:string
    private postsSalvos: (CursoExterno | CursoInterno | Aula | Postagem)[] = []
    /**
     * 
     */
    private postsCriados: (CursoExterno | CursoInterno | Aula | Postagem)[] = []
    /**
     * listagemTipo = "linhas" ou "Tabelas"
     */
    private listagemTipo: "Linhas" | "Tabelas" = "Linhas"
    /**
     * Postslikes
     * lista todos os likes dados pelo usuário, usando um map, que organiza as informações da seguinte forma:
     * Map<Tipo da postagem, [IDs das postagens] >
     * @type {Map<string,number[]>}
     * Mesma regra para postsDeslikes
     * 
     */
    private postsLikes: Map<string, number[]> = new Map<string, number[]>
    private postsDeslikes: Map<string, number[]> = new Map<string, number[]>
    /** 
    * comentsLikes
    * lista todos os likes dados nos comentários de todas as publicões, organiza as informações da seguinte forma:
    * Map<[Map<IDPostagem, IDComentarios[]]>
    * @type {Map<number, number[]>}
    * Mesma regra para comentsDeslikes
    * 
    */
    private comentsLikes: Map<number, number[]>
    private comentsDeslikes:Map<number, number[]>

    private logado:boolean = false

    private IDUsuariosSeguidos:number[]

    constructor(nome: string, IDUsuario: number, EMail: string, senha: string) {
        this.nome = nome
        this.IDUsuario = IDUsuario
        this.EMail = EMail
        this.senha = senha
        this.listagemTipo = "Tabelas";
        this.postsLikes.set('Postagem', [])
        this.postsLikes.set('Aula', [])
        this.postsLikes.set('CursoInterno', [])
        this.postsLikes.set('CursoExterno', [])
        this.postsLikes.set('Comentario', [])
        this.postsLikes.set('Resposta', [])
    }

    /**
     * logar()->Se o parâmetro senha for compátivel com a senha do usuário então this.logado = true.
     * Além disto retorna true se o login for feito com sucesso e false se não.
     * @param {string} senhaTeste 
     * @returns {boolean}
     */
    logar(senhaTeste:string, redeMain:RedeMain):boolean{
        if(redeMain.getUsuarioLogado() === this){
            if(senhaTeste === this.senha){
                this.logado = true
                return true
            }
            return false
        }
        return false;
        
    }

    deslogar():boolean{
        if(this.logado == true){
            this.logado = false
            return true
        }
        return false
    }

    printarUs(printando:object | string | object[] | string[] | undefined):void{
        if(Array.isArray(printando) && typeof printando[0] == "object"){
            printando.forEach(objetoAtual => console.table(objetoAtual))
        }else if(Array.isArray(printando) && typeof printando[0] == "string"){
            printando.forEach(objetoAtual => console.info(objetoAtual))
        }else if(typeof printando == "string"){
            console.info(printando)
        } else if(typeof printando == "object"){
            console.table(printando)
        }
    }

    getPerfil():string | object{
        if(this.logado && this.listagemTipo == "Linhas"){
            return this.getPerfilLinhas()
        } else if(this.logado && this.listagemTipo == "Tabelas"){
            return this.getPerfilObjeto()
        } else if(!this.logado){
            return "Usuario não logado"
        } else{
            return "Erro em getperfil()"
        }

    }

    public getPerfilLinhas():string{
        return`ID:             ${this.IDUsuario}\n`
            + `Nome:           ${this.nome}\n`
            + `E-Mail:         ${this.EMail}\n`
            + `Foto de perfil: ${this.fotoPerfil}`
            + `Senha:          ${this.senha}`
    }

    public getPerfilObjeto():object{
        return{
            ID: this.IDUsuario,
            Nome: this.nome,
            EMail: this.EMail,
            Senha: this.senha
        }
    }

    getLogado():boolean{
        return this.logado
    }

    getListagemTipo():"Linhas" | "Tabelas"{
        return this.listagemTipo
    }

    getNome():string{
        return this.nome
    }

    getEMail():string{
        return this.EMail
    }

    getIDUsuario():number{
        return this.IDUsuario
    }

    getFotoPerfil():string{
        return this.fotoPerfil
    }

    getPostsSalvosObject():(CursoExterno | CursoInterno | Aula | Postagem)[]{
        if(!this.logado){
            throw new Error(`Usuario não logado em getCriados()`)
        }
        return this.postsSalvos
    }

    getPostsSalvos():(string | object)[]{
        if(!this.logado){
            throw new Error(`Usuario não logado em getSalvos()`)
        }
        if(this.postsSalvos.length == 0){
            return ["Nenhuma postagem salva"]
        } else {
            const retorno:(string|object)[]= []
            this.postsSalvos.forEach((postAtual)=>{
                retorno.push(postAtual.getPostagem(this))
            })
            return retorno
        }
    }
    getPostsCriadosObject():(CursoExterno | CursoInterno | Aula | Postagem)[]{
        if(!this.logado){
            throw new Error(`Usuario não logado em getCriados()`)
        }
        return this.postsCriados
    }

    getPostsCriados():(string | object)[]{
        if(!this.logado){
            throw new Error(`Usuario não logado em getCriados()`)
        }
        if(this.postsCriados.length == 0){
            return ["Nenhuma postagem criada"]
        } else {
            const retorno:(string | object)[] = []
            this.postsCriados.forEach((postAtual)=>{
                retorno.push(postAtual.getPostagem(this))
            })
            return retorno
        }
    }

    getIDUsuariosSeguidos():number[]{return this.IDUsuariosSeguidos}

    setSenha(senhaNova: string): void {
        if(!this.logado){
            throw new Error(`Usuario não logado em alterarSenha(${senhaNova})`);
            return;
        } else{
            this.senha = senhaNova;
        }
    }

    setNome(novoNome: string): void {
        if(!this.logado){
            throw new Error(`Usuario não logado em alterarNome(${novoNome})`)
            return;
        }
            this.nome = novoNome
    }

    setFotoPerfil(novaFoto:string){
        if(!this.logado){
            throw new Error(`Usuario não logado em setFotoPerfil(${novaFoto})`)
            return
        }
        this.fotoPerfil = novaFoto
    }

    setEMail(novoEMail:string){
        if(!this.logado){
            throw new Error(`Usuario não logado em setEMail(${novoEMail})`)
            return
        }
        this.EMail = novoEMail;
    }

    setListagemTipo(tipo:"Linhas" | "Tabelas"):void{
        this.listagemTipo = tipo
    }

    addSalvos(post: Postagem | Aula | CursoExterno | CursoInterno):void{
        if(!this.logado){
            throw new Error(`Usuario não logado em addSalvos(${post})`)
        }
        
        this.postsSalvos.push(post)
    }

    seguirUS(idUsuarioSeguir:number):void{
        if(!this.logado){
            throw new Error(`Usuario não logado em seguirUS(${idUsuarioSeguir})`)
        }
        this.IDUsuariosSeguidos.push(idUsuarioSeguir)
    }

    /**
     * processarLike() -> Adiciona todos os likes feitos pelo usuário no banco de dados, que é estruturado com Map,
     * isso possibilita identificar se o like já foi dado ou não no objeto especifico, além disso, se o like já foi dado ele o retira do banco.
     * Esta função já atualiza automaticamente a quantidade nova de likes no objeto
     * @param {Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta} objeto -> É
     * o objeto que receberá o like.
     * @returns {boolean} Se o like for dado retorna true, se for retirado retorna false.
     */
    processarLike(objeto: Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta): boolean {
        if(!this.logado){
            throw new Error(`Usuario não logado em processarLike(${objeto})`)
        }
        if (objeto instanceof Comentario || objeto instanceof Resposta) {
            //ID que será a chave no map dos comentários
            let IDChave = objeto.getIDPostagem()
            //Se a chave não existir adiciona a chave
            if(!this.comentsLikes.has(IDChave)){
                this.comentsLikes.set(IDChave, [objeto.getIDComentario()])
                objeto.addLikeComent()
                return true
                
            //Se existir
            } else {
                this.comentsLikes.forEach((value, key) => {
                    if (key === IDChave) {
                        //Se objeto.IDComentario em IDChave já exitir remove-o, assim retirando o like
                        if (value.indexOf(IDChave) > -1) {
                            value.splice(value.indexOf(IDChave), 1)
                            //removendo a chave(idPostagem referência) se estiver sem ids
                            if(value.length === 0){
                                this.comentsLikes.delete(key)
                            }
                            //Se objeto.IDComentario em IDChave não existir o adiciona
                        } else {
                            value.push(objeto.getIDComentario())
                            objeto.addLikeComent()
                            return true
                        }
                    }
                });
            }
            objeto.rmLikeComent()
            return false
        } else if (objeto instanceof CursoExterno) {
            this.postsLikes.forEach((value, key) => {
                if (key === 'CursoExterno') {
                    if (value.indexOf(objeto.getIDPostagem()) > -1) {
                        value.splice(value.indexOf(objeto.getIDPostagem()), 1)
                        if(value.length === 0){
                        }
                    } else {
                        value.push(objeto.getIDPostagem())
                        objeto.addLike()
                        return true
                    }
                }
            });
            objeto.rmLike()
            return false
        } else if (objeto instanceof CursoInterno) {
            this.postsLikes.forEach((value, key) => {
                if (key === 'CursoInterno') {
                    if (value.indexOf(objeto.getIDPostagem()) > -1) {
                        value.splice(value.indexOf(objeto.getIDPostagem()), 1)
                    } else {
                        value.push(objeto.getIDPostagem())
                        objeto.addLike()
                        return true
                    }
                }
            });
            objeto.rmLike()
            return false
        } else if (objeto instanceof Aula) {
            this.postsLikes.forEach((value, key) => {
                if (key === 'Aula') {
                    if (value.indexOf(objeto.getIDPostagem()) > -1) {
                        value.splice(value.indexOf(objeto.getIDPostagem()), 1)
                    } else {
                        value.push(objeto.getIDPostagem())
                        objeto.addLike()
                        return true
                    }
                }
            });
            objeto.rmLike()
            return false
        } else if (objeto instanceof Postagem) {
            this.postsLikes.forEach((value, key) => {
                if (key === 'Postagem') {
                    if (value.indexOf(objeto.getIDPostagem()) > -1) {
                        value.splice(value.indexOf(objeto.getIDPostagem()), 1)
                    } else {
                        value.push(objeto.getIDPostagem())
                        objeto.addLike()
                        return true
                    }
                }
            });
            objeto.rmLike()
            return false
        } else {
            throw new Error(`instanceof para argumento "classe" não encontrada em processarLike(${objeto})`)
        }
    }

    /**
     * processarDeslike() -> Adiciona todos os deslikes feitos pelo usuário no banco de dados, que é estruturado com Map,
     * isso possibilita identificar se o deslike já foi dado ou não no objeto especifico, além disso, se o deslike já foi dado ele o retira do banco.
     * Esta função já atualiza automaticamente a quantidade nova de deslikes no objeto.
     * @param {Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta} objeto -> É
     * o objeto que receberá o deslike.
     * @returns {boolean} Se o deslike for dado retorna true, se for retirado retorna false.
     */
    processarDesike(objeto: Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta): boolean {
        if(!this.logado){
            throw new Error(`Usuario não logado em processarDesllike(${objeto})`)
        }
        if (objeto instanceof Comentario || objeto instanceof Resposta) {
            //ID que será a chave no map dos comentários
            let IDChave = objeto.getIDPostagem()
            //Se a chave não existir adiciona a chave
            if(!this.comentsDeslikes.has(IDChave)){{
                this.comentsDeslikes.set(IDChave, [objeto.getIDComentario()])
                objeto.addDeslikeComent()
                return true
                }
            //Se existir verifica-o
            } else {
                this.comentsDeslikes.forEach((value, key) => {
                    if (key === IDChave) {
                        //Se IDChave já exitir remove-o, assim retirando o like
                        if (value.indexOf(IDChave) > -1) {
                            value.splice(value.indexOf(IDChave), 1)
                            //removendo a chave(idPostagem referência) se estiver sem ids
                            if(value.length === 0){
                                this.comentsDeslikes.delete(key)
                            }
                            //Se não existir o adiciona
                        } else {
                            value.push(objeto.getIDComentario())
                            objeto.addDeslikeComent()
                            return true
                        }
                    }
                });
            }
            objeto.rmDeslikeComent()
            return false
        } else if (objeto instanceof CursoExterno) {
            this.postsDeslikes.forEach((value, key) => {
                if (key === 'CursoExterno') {
                    if (value.indexOf(objeto.getIDPostagem()) > -1) {
                        value.splice(value.indexOf(objeto.getIDPostagem()), 1)
                        if(value.length === 0){
                        }
                    } else {
                        value.push(objeto.getIDPostagem())
                        objeto.addDeslike()
                        return true
                    }
                }
            });
            objeto.rmDeslike()
            return false
        } else if (objeto instanceof CursoInterno) {
            this.postsDeslikes.forEach((value, key) => {
                if (key === 'CursoInterno') {
                    if (value.indexOf(objeto.getIDPostagem()) > -1) {
                        value.splice(value.indexOf(objeto.getIDPostagem()), 1)
                    } else {
                        value.push(objeto.getIDPostagem())
                        objeto.addDeslike()
                        return true
                    }
                }
            });
            objeto.rmDeslike()
            return false
        } else if (objeto instanceof Aula) {
            this.postsDeslikes.forEach((value, key) => {
                if (key === 'Aula') {
                    if (value.indexOf(objeto.getIDPostagem()) > -1) {
                        value.splice(value.indexOf(objeto.getIDPostagem()), 1)
                    } else {
                        value.push(objeto.getIDPostagem())
                        objeto.addDeslike()
                        return true
                    }
                }
            });
            objeto.rmDeslike()
            return false
        } else if (objeto instanceof Postagem) {
            this.postsDeslikes.forEach((value, key) => {
                if (key === 'Postagem') {
                    if (value.indexOf(objeto.getIDPostagem()) > -1) {
                        value.splice(value.indexOf(objeto.getIDPostagem()), 1)
                    } else {
                        value.push(objeto.getIDPostagem())
                        objeto.addDeslike()
                        return true
                    }
                }
            });
            objeto.rmDeslike()
            return false
        } else {
            throw new Error(`instanceof para argumento "classe" não encontrada em processarLike(${objeto})`)
        }
    }

    /**
     * hasLike() -> Retorna se o objeto já recebeu like por este usuário
     * 
     * @param {Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta} objeto 
     * @returns {boolean}
     */
    hasLike(objeto: Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta): boolean {
        if(!this.logado){
            throw new Error(`Usuario não logado em hasLike(${objeto})`)
        }
        if (objeto instanceof Comentario || objeto instanceof Resposta) {
            //ID que deve ser a chave no map dos comentários
            let IDChave = objeto.getIDPostagem()
            if(!this.comentsLikes.has(IDChave)){{
                return false
                }
            } else {
                this.comentsLikes.forEach((value, key) => {
                        if (key === IDChave && value.find(idComentario => idComentario == objeto.getIDComentario())) {
                                return true
                        }
                    });
                    return false
            }
        } else if(objeto instanceof CursoExterno){
            this.postsLikes.forEach((value, key) => {
                if (key === "CursoExterno" && value.find(idPostagem => idPostagem == objeto.getIDPostagem())){
                        return true
                }
            });
            return false
        } else if(objeto instanceof CursoInterno){
            this.postsLikes.forEach((value, key) => {
                if (key === "CursoInterno" && value.find(idPostagem => idPostagem == objeto.getIDPostagem())){
                        return true
                }
            });
            return false
        } else if(objeto instanceof Aula){
            this.postsLikes.forEach((value, key) => {
                if (key === "Aula" && value.find(idPostagem => idPostagem == objeto.getIDPostagem())){
                        return true
                }
            });
            return false
        } else if(objeto instanceof Postagem){
            this.postsLikes.forEach((value, key) => {
                if (key === "Postagem" && value.find(idPostagem => idPostagem == objeto.getIDPostagem())){
                        return true
                }
            });
            return false
        } else {
            throw new Error(`Erro em hasLike(${objeto})`);
            
        }
    }

     /**
     * hasDeslike() -> Retorna se o objeto já recebeu deslike por este usuário
     * 
     * @param {Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta} objeto 
     * @returns {boolean}
     */
    hasDeslike(objeto: Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta): boolean {
        if(!this.logado){
            throw new Error(`Usuario não logado em hasDeslike(${objeto})`)
        }
        if (objeto instanceof Comentario || objeto instanceof Resposta) {
            //ID que deve ser a chave no map dos comentários
            let IDChave = objeto.getIDPostagem()
            if(!this.comentsDeslikes.has(IDChave)){{
                return false
                }
            } else {
                this.comentsDeslikes.forEach((value, key) => {
                        if (key === IDChave && value.find(idComentario => idComentario == objeto.getIDComentario())) {
                                return true
                        }
                    });
                    return false
            }
        } else if(objeto instanceof CursoExterno){
            this.postsDeslikes.forEach((value, key) => {
                if (key === "CursoExterno" && value.find(idPostagem => idPostagem == objeto.getIDPostagem())){
                        return true
                }
            });
            return false
        } else if(objeto instanceof CursoInterno){
            this.postsDeslikes.forEach((value, key) => {
                if (key === "CursoInterno" && value.find(idPostagem => idPostagem == objeto.getIDPostagem())){
                        return true
                }
            });
            return false
        } else if(objeto instanceof Aula){
            this.postsDeslikes.forEach((value, key) => {
                if (key === "Aula" && value.find(idPostagem => idPostagem == objeto.getIDPostagem())){
                        return true
                }
            });
            return false
        } else if(objeto instanceof Postagem){
            this.postsDeslikes.forEach((value, key) => {
                if (key === "Postagem" && value.find(idPostagem => idPostagem == objeto.getIDPostagem())){
                        return true
                }
            });
            return false
        } else {
            throw new Error(`Erro em hasDesike(${objeto})`);
            
        }
    }




}