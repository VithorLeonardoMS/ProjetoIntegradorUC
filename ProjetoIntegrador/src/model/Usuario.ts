
import { Comentario } from "./Comentario"
import { Aula } from "./Postagem/Aula"
import { CursoExterno } from "./Postagem/CursoExterno"
import { CursoInterno } from "./Postagem/CursoInterno"
import { Postagem } from "./Postagem/Postagem"
import { Resposta } from "./Resposta"


export class Usuario {
    private nome: string
    private IDUsuario: number
    private email: string
    private senha: string
    private fotoPerfil:string
    private postsSalvos: (CursoExterno | CursoInterno | Aula | Postagem)[] = []
    private postsCriados: (CursoExterno | CursoInterno | Aula | Postagem)[] = []
    /**
     * listagemTipo = "linhas" ou "Tabelas"
     */
    private listagemTipo: string = "Linhas"
    /**
     * Postslikes
     * lista todos os likes dados pelo usuário, usando um map, que organiza as informações da seguinte forma:
     * Map<Tipo da postagem, [IDs das postagens] >
     * @type {Map<string,number[]>}
     * Mesma regra para postsDeslikes
     * 
     */
    public postsLikes: Map<string, number[]> = new Map<string, number[]>
    public postsDeslikes: Map<string, number[]> = new Map<string, number[]>
    /** 
    * comentsLikes
    * lista todos os likes dados nos comentários de todas as publicões, organiza as informações da seguinte forma:
    * Map<[Map<IDPostagem, IDComentarios[]]>
    * @type {Map<number, number[]>}
    * Mesma regra para comentsDeslikes
    * 
    */
    public comentsLikes: Map<number, number[]>
    public comentsDeslikes:Map<number, number[]>

    private logado:boolean = false


    constructor(nome: string, IDUsuario: number, email: string, senha: string) {
        this.nome = nome
        this.IDUsuario = IDUsuario
        this.email = email
        this.senha = senha
        this.postsLikes.set('Postagem', [])
        this.postsLikes.set('Aula', [])
        this.postsLikes.set('CursoInterno', [])
        this.postsLikes.set('CursoExterno', [])
        this.postsLikes.set('Comentario', [])
        this.postsLikes.set('Resposta', [])
    }

    logar(senhaTeste:string):boolean{
        if(senhaTeste === this.senha){
            this.logado = true
            return true
        }
        return false
    }

    deslogar():boolean{
        if(this.logado == true){
            this.logado = false
            return true
        }
        return false
    }

    getPerfil(usuario:Usuario):string | object{
        if(this.logado && this.listagemTipo == "Linhas"){
            return this.getPerfilLinhas()
        } else if(this.logado && this.listagemTipo == "Tabelas"){
            return this.getPerfilObjeto()
        } else{
            return "Usuario não logado"
        }

    }

    getPerfilLinhas():string{
        return`ID:             ${this.IDUsuario}\n`
            + `Nome:           ${this.nome}\n`
            + `E-Mail:         ${this.email}\n`
            + `Foto De perfil: ${this.fotoPerfil}`
    }

    getPerfilObjeto():object{
        return{
            ID: this.IDUsuario,
            Nome: this.nome,
            EMail: this.email,
        }
    }

    getLogado():boolean{
        return this.logado
    }

    getListagemTipo():string{
        return this.listagemTipo
    }

    getNome():string{
        return this.nome
    }

    getEmail():string{
        return this.email
    }

    getIDUsuario():number{
        return this.IDUsuario
    }

    getFotoPerfil():string{
        return this.fotoPerfil
    }

    getSalvos():(string | object)[] |undefined{
        if(!this.logado){
            throw new Error(`Usuario não logado em getSalvos()`)
        }
        if(this.postsSalvos.length == 0){
            return undefined
        } else {
            const retorno:(string|object)[]= []
            this.postsSalvos.forEach((postAtual)=>{
                retorno.push(postAtual.getPostagem(this))
            })
            return retorno
        }
    }

    getCriados():(string | object)[] | undefined{
        if(!this.logado){
            throw new Error(`Usuario não logado em getCriados()`)
        }
        if(this.postsSalvos.length == 0){
            return undefined
        } else {
            const retorno:(string | object)[] = []
            this.postsCriados.forEach((postAtual)=>{
                retorno.push(postAtual.getPostagem(this))
            })
            return retorno
        }
    }

    setSenha(senhaNova: string, senhaVerifica: string): void {
        if(!this.logado){
            throw new Error(`Usuario não logado em alterarSenha(${senhaNova})`)
        }
        if (this.senha === senhaVerifica) {
            this.senha === senhaNova
        }
    }

    setNome(novoNome: string, senhaVerifica: string): void {
        if(!this.logado){
            throw new Error(`Usuario não logado em alterarNome(${novoNome},${senhaVerifica})`)
        }
        if (this.senha === senhaVerifica) {
            this.nome === novoNome
        }
    }

    setFotoPerfil(novaFoto:string){
        if(!this.logado){
            throw new Error(`Usuario não logado em addFotoPerfil(${novaFoto})`)
        }
        this.fotoPerfil = novaFoto
    }

    setListagemTipo(tipo:string):boolean{
        if(tipo == "Linhas" || tipo == "Tabelas"){
            this.listagemTipo = tipo
            return true
        }
        return false
    }

    addSalvos(post: Postagem | Aula | CursoExterno | CursoInterno):void{
        if(!this.logado){
            throw new Error(`Usuario não logado em addSalvos(${post})`)
        }
        
        this.postsSalvos.push(post)
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