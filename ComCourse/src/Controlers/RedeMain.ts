import { Comentario } from "../classes/ComentarioAntigo.js"
import { Aula } from "../classes/Postagem/AulaAntigo.js"
import { CursoExterno } from "../classes/Postagem/CursoExterno.js"
import { CursoInterno } from "../classes/Postagem/CursoInterno.js"
import { Postagem } from "../classes/Postagem/Postagem.js"
import { Resposta } from "../classes/RespostaAntigo.js"
import { Usuario } from "../classes/UsuarioAntigo.js"
import { mostrarCursos } from "../view/Front/js/mostrarAulas.js"
import { menuUsuario } from "../view/Menus/menuUsuario.js"
import { menuVerPost } from "../view/Menus/menuVerPost.js"
import { optionSenha } from "./optionSenha.js"

const rl = require("readline-sync");

export class RedeMain{
    
    private listaUsuario:Usuario[] = [new Usuario("Guilherme", 1, "guilherme@gmail.com","12345678")]
    private listaAula:Aula[] = []
    private listaCursoExterno:CursoExterno[] = []
    private listaCursoInterno:CursoInterno[] = []
    private listaPostagem:Postagem[] = []
    private usuarioLogado:Usuario = this.listaUsuario[0]
    /**
     * IDsRemovidos
     * 
     * Organiza todas as listas de IDsRemovidos para cadas classes
     * tem a seguinte estrutura:
     * Map<nome da classe, numero de ids da classe Já Removidos>
     * @type {Map<string, number>}
     * 
     */
    private IDsRemovidos: Map<string, number> = new Map<string, number>
    constructor(){
        //Definindo as chaves
        this.IDsRemovidos.set('Usuario',0)
        this.IDsRemovidos.set('Aula',0)
        this.IDsRemovidos.set('CursoExterno',0)
        this.IDsRemovidos.set('CursoInterno',0)
        this.IDsRemovidos.set('Postagem',0)
    }

    getUsuarioLogado():Usuario{return this.usuarioLogado}

    getListaUsuarios():Usuario[]{return this.listaUsuario}

    getListaAulas():Aula[]{return this.listaAula}

    getListaCursoExternos():CursoExterno[]{return this.listaCursoExterno}

    getListaCursoInterno():CursoInterno[]{return this.listaCursoInterno}

    /**
     * Função futuramente será integrada ao bando de dados;
     * @returns {boolean} -> Feedback do processo;
     * @param {Usuario} usuario -> Usuario criador - precisa estar logado;
     * Os outros parâmetros são referentes ao constructor de CursoInterno.
     */
    createCursoInterno(usuario:Usuario,titulo:string, descricao:string, anexos?:string[]):boolean{
        anexos = anexos? anexos : []
        try{
            const id = this.definirNovoID(this.getListaCursoInterno(),"CursoInterno");
            this.listaCursoInterno.push(new CursoInterno(this, id, usuario.getIDUsuario(),usuario.getNome(),titulo, descricao, anexos))
        }catch{
            return false
        }
        return true;
    }

    getListaPostagem():Postagem[]{return this.listaPostagem}

    getUsuarioByID(idUsuario:number):Usuario | undefined{
        return this.listaUsuario.find(usuarioAtual => usuarioAtual.getIDUsuario() == idUsuario)
    }

    setUsuarioLogado(usuarioNovo:Usuario, senhaTeste:string):boolean{
        this.usuarioLogado.deslogar();
        if(senhaTeste.length < 8 || senhaTeste.includes(" ")){
            console.error("A senha deve conter pelo menos 8 caracteres e não pode conter espaços");
            this.usuarioLogado = usuarioNovo;
        } else if(usuarioNovo.logar(senhaTeste,this)){

            return true;
        } else{
            console.error("Senha incorreta");
        }
        return false
    }

    private listaVazia():void{
        console.warn("Sem Valores.");
    }

    private indiceExiste(indice:number,array:any[], printar?:boolean):Boolean{
        if(!Number.isInteger(indice)){
            printar? console.error("Valor não é um número inteiro.") : null;
        } else if(indice < 0){
            printar? console.error("Valor Negativo é inválido.") : null;
        } else if(indice > array.length){
            printar? console.error("Valor maior que o possivel.") : null;
        } else{
            return true;
        }
        return false;
    }

    private numeroPossivel(numero:number, printar?:boolean, isInt?:boolean, limite?:number):boolean{
        if(isInt && !Number.isInteger(numero)){
            printar? console.error("Valor não é um número Inteiro.") : null;
        } else if(numero < 0){
            printar? console.error("Valor Negativo é inválido.") : null;
        } else if(limite && numero > limite){
            printar? console.error("Valor maior que o limite.") : null;
        } else{
            return true
        }
        return false
    }

    public logar(eMail:string, senha:string){
        let usFind = this.listaUsuario.find(usAtual => usAtual.getEMail() == eMail);
        if(usFind){
            if(usFind && this.setUsuarioLogado(usFind,senha)){
                this.usuarioLogado = usFind
                usFind.logar(senha,this);
                return true;
            } 
            console.warn("Senha incorreta")
        } else{
            console.warn("Email não encontrado. ")
        }
        //    console.warn("Senha incorreta.")
        return false
    }

 
    public loginRl():boolean{
        let rlEmail = rl.question("Qual o e-mail para login? ");
        let usFind = this.listaUsuario.find(usAtual => usAtual.getEMail() == rlEmail);
        if(usFind){
            optionSenha((senhaTeste)=>{
                if(usFind && this.setUsuarioLogado(usFind,senhaTeste)){
                    menuUsuario(this);
                    return true;
                } 
                return false;
            })
        } else{
            console.warn("Email não encontrado. ")
        }

        //    console.warn("Senha incorreta.")

        return false
    }

    /**
     * 
     */
    public cadastro(nome:string,email:string, senha:string):boolean{
        nome = nome.trim();
        if("" == nome){
            console.error("O nome não pode estar vazio");
            return false;
        }

        let id = this.definirNovoID(this.listaUsuario, "Usuario")
        email = email.trim()
        if(email.split(" ").length > 1){
            console.warn("O email não pode conter espacos");
            return false;
        }

        if(senha.length > 7 && !senha.includes(" ")){
            try{
                let usuario = new Usuario(nome, id, email, senha);
                this.listaUsuario.push(usuario);
            } catch(error) {
                console.error(`Erro em this.definirNovoID(this.listaUsuario,${this.IDsRemovidos.get("Usuarios")})`)
                return false;
            }
            return true;
        } else {
            console.error("A senha deve ter pelo menos 8 caracteres e nao pode conter espacos!");
            return false;
        }
    }

    /**
     * cadstroRl()- Cadstra um novo Usuario na listaUsuarios.
     * Se ocorrer tudo certo leva o usuário para menuUsuario
     * @returns {void}
     */
    public cadastroRl():void{
        let nome = rl.question("Qual o nome de usuario? ").trim()
        if("" == nome){
            console.warn("O nome não pode estar vazio");
            return;
        }

        let id = this.definirNovoID(this.listaUsuario, "Usuario")
        let email = rl.question("Qual o email do cadastro? ").trim()
        if(email.split(" ").length > 1){
            console.warn("O email não pode conter espacos");
            return;
        } 

        let senha:string = " e e"

        while(senha !== "0" && senha.length < 8 || senha.includes(" ")){
            senha = rl.question("Qual a senha de usuario? ")
            console.info("0 -> para cancelar")
            
            if (senha.length < 8 || senha.includes(" ")) {
                console.warn("A senha deve ter pelo menos 8 caracteres e nao pode conter espacos!");
            } 
        }
        
        if(senha == "0"){
            console.log("Cadastro cancelado pelo usuário");
        } else{
            try{
                let usuario = new Usuario(nome, id, email, senha);
                this.usuarioLogado.deslogar()
                this.usuarioLogado = usuario;
                usuario.logar(senha,this);
                this.listaUsuario.push(usuario);
                menuUsuario(this);
            } catch(error) {
                console.error(`Erro em this.definirNovoID(this.listaUsuario,${this.IDsRemovidos.get("Usuarios")})`)
            }
        }
    }

    verPostsPorQuantidade(posts:(CursoExterno | CursoInterno | Aula | Postagem)[], quantidade:number):(CursoExterno | CursoInterno | Aula | Postagem)[]{
        let retorno:(CursoExterno | CursoInterno | Aula | Postagem)[] = []
        if(quantidade > posts.length){
            quantidade = posts.length 
        }
        posts.forEach((postagem,indice)=>{
            (indice < quantidade)? retorno.push(postagem) : null
        })
        return retorno
    }

    acessarPostRl(usuarioLogado:Usuario, postagens:Postagem[]):void{
        let teste = true
        let quantidade = 10
        while(teste){
            usuarioLogado.printarUs(this.verPostsPorQuantidade(postagens,quantidade))
            console.info("Ver mais: -1\nVoltar: -2\nSelecionar post: ID da postagem")
            let resposta = rl.questionInt("Retorno: ")
            if(resposta == -2){
                teste = false;
                console.clear();
            } else if(resposta == -1){
                console.clear();
                quantidade += 10;
            }else {
                let postFind = postagens.find(postagem => postagem.getIDPostagem() == resposta)
                if(!postFind){
                    console.clear()
                    console.error("ID da postagem não encontrado")
                } else{
                    console.clear()
                    menuVerPost(this,postFind)
                    teste = false
                }
            }
        }

    } 
    
    /**
     * Filtra ususarios apartir do nome;
     * Funciona apenas no terminal
     * @param {Usuario} usuarioLogado 
     */
    pesquisarUsuariosRl(usuarioLogado:Usuario){
        let teste = true
        while(teste){
            console.log("0. voltar")
            console.log("1. pesquisar")
            console.log("//2 Ver mais")
            //
            let opcao = rl.questionInt("Digite a opcao: ", {limit: ['0', '1'],
            limitMessage: 'Digite 0 ou 1'})

            switch(opcao){
                case 0: teste = false; break;
                case 1: 
                    console.clear()
                    let nomePesquisado = rl.question("Digite o nome: ")
                    let listaDePerfis:Usuario[];
                    listaDePerfis = this.listaUsuario.filter(usAtual => usAtual.getNome().toLowerCase().includes(nomePesquisado.toLowerCase()))
                    if(usuarioLogado.getListagemTipo() === "Linhas"){
                        let acc:string[] = []
                        listaDePerfis.forEach((usAtual)=>{
                            acc.push(usAtual.getPerfilLinhas());
                        })
                        usuarioLogado.printarUs(acc);
                    } else{
                        let acc:object[] = []
                        listaDePerfis.forEach((usAtual)=>{
                            acc.push(usAtual.getPerfilObjeto());
                        })
                        usuarioLogado.printarUs(acc);
                    }
                    break;
            }
        }
    }

    private addIDsRemovidos(classe:string, nEspecifico?:number){
        let teste = this.IDsRemovidos.get(classe)
        if(nEspecifico){
            if(!teste){
                throw new Error(`Erro em addIDsRemovidos(${classe})`);
                
            } else{
                this.IDsRemovidos.set('Usuario', teste+ nEspecifico)
            }
        
        } else if(!teste){
            throw new Error(`Erro em addIDsRemovidos(${classe}, ${nEspecifico? nEspecifico : 'nullo'})`);
            
        } else{
            this.IDsRemovidos.set('Usuario', teste++)
        }

    }

    /**
     * @returns {number} > Novo ID para item lista
     * @param lista -> Lista que terá um novo ID definido
     * @param tipo -> Deve ser o mesmo tipo dos itens da lista
     * @param idsRemovidos -> Quando tipo for "Comentario" | "Resposta" é nescesário os 
     *                        idsRemovidos
     */
    definirNovoID(lista:Comentario[] | Resposta[] | Usuario[] | Aula[] | CursoExterno[] | CursoInterno[] | Postagem[],tipo:"Usuario" | "Comentario" | "Resposta" | "Aula" | "CursoExterno" | "CursoInterno" |  "postagem", idsRemovidos?:number):number{
        if((tipo == "Comentario" || tipo == "Resposta") && idsRemovidos){
            return lista.length + idsRemovidos
        } else if(tipo !== "Comentario" && tipo !== "Resposta"){
            let retorno = this.IDsRemovidos.get(tipo)
            return (retorno? retorno:0) + lista.length
        } else{
            throw new Error(`Erro em definirNovoID(${lista}, ${tipo}, ${idsRemovidos}) -> Precisa adcionar os idsRemovidos`);
        }

    }

    removerPost(objeto: CursoExterno | CursoInterno | Aula | Postagem ):boolean{
        if(objeto instanceof CursoExterno){
            let idsRemTest = this.IDsRemovidos.get('CursoExterno')
            this.addIDsRemovidos('CursoExterno')
            if(this.listaCursoExterno.indexOf(objeto)){
                this.listaCursoExterno.splice(this.listaCursoExterno.indexOf(objeto),1)
                return true
            } 
        } else if(objeto instanceof CursoInterno){
            let idsRemTest = this.IDsRemovidos.get('CursoInterno')
            this.addIDsRemovidos('CursoInterno')
            if(this.listaCursoInterno.indexOf(objeto)){
                this.listaCursoInterno.splice(this.listaCursoInterno.indexOf(objeto),1)
                return true
            }
        } else if(objeto instanceof Aula){
            let idsRemTest = this.IDsRemovidos.get('Aula')
            this.addIDsRemovidos('Aula')
            if(this.listaAula.indexOf(objeto)){
                this.listaAula.splice(this.listaAula.indexOf(objeto),1)
                return true
            }
        }  else if(objeto instanceof Postagem){
            let idsRemTest = this.IDsRemovidos.get('Postagem')
            this.addIDsRemovidos('Postagem')
            if(this.listaPostagem.indexOf(objeto)){
                this.listaPostagem.splice(this.listaPostagem.indexOf(objeto),1)
                return true
            }
        }
        return false
    }

}