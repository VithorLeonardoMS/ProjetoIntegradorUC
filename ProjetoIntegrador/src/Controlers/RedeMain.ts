import { Comentario } from "../classes/Comentario"
import { Aula } from "../classes/Postagem/Aula"
import { CursoExterno } from "../classes/Postagem/CursoExterno"
import { CursoInterno } from "../classes/Postagem/CursoInterno"
import { Postagem } from "../classes/Postagem/Postagem"
import { Resposta } from "../classes/Resposta"
import { Usuario } from "../classes/Usuario"
import { menuUsuario } from "../view/menuUsuario"
import { menuVerPost } from "../view/menuVerPost"

const rl = require("readline-sync")

export class RedeMain{
    
    private listaUsuario:Usuario[] = [new Usuario("teste",0,"teste","teste123")]
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

    getListaPostagem():Postagem[]{return this.listaPostagem}

    getUsuarioByID(idUsuario:number):Usuario | undefined{
        return this.listaUsuario.find(usuarioAtual => usuarioAtual.getIDUsuario() == idUsuario)
    }

    setUsuarioLogado(usuarioNovo:Usuario, senhaTeste:string):boolean{
        if(senhaTeste.length < 8){
            console.error("A senha deve conter pelo menos 8 caracteres")
        } else if(usuarioNovo.logar(senhaTeste)){
            this.usuarioLogado.deslogar()
            this.usuarioLogado = usuarioNovo
            return true
        } else{
            console.error("Senha incorreta")
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

    /**
     * optionSenha()-> Cria um while que permite que o usuário insira uma senha, caso a senha esteja errada,
     * ele ainda pode tentar novamente mais 3 vezes, digitando 0 ele cancela a operação.
     * Leva uma função de callback que executa o que for desejado com a senha que o usuario inserir,
     * a função de callback retorna uma boolean, caso retorne true o processo encerra.
     * Se a função de callback retornar true, o nétodo também retorna true
     * @param {Usuario} usuario 
     * @param callback 
     * @returns {boolean}
     */
    private optionSenha(callback:(senhaTestando:string) => boolean):boolean{
        let senhaTeste:string = '1'
        let contagem = 4
        while(senhaTeste != "0" && contagem != 0){
            console.info("0 -> para cancelar")
            senhaTeste = rl.question("Digite a senha: ",{hideEchoBack:true});
            if (senhaTeste.length < 8) {
                console.warn("A senha deve ter pelo menos 8 caracteres!");
                continue; // Volta para o início do loop
            }
            if(callback(senhaTeste)){
                senhaTeste = "0"
                return true;
            } else{
                contagem--
                console.warn("Senha incorreta!")
                console.info(`Tentativas restantes: ${contagem}`)
            }
            
        }
        return false;
    }
 
    public loginRl():boolean{
        let rlEmail = rl.question("Qual o e-mail para login? ");
        let usFind = this.listaUsuario.find(usAtual => usAtual.getEmail() == rlEmail);
        if(usFind){
            this.optionSenha((senhaTeste)=>{
                if(usFind && this.setUsuarioLogado(usFind,senhaTeste)){
                    this.usuarioLogado = this.listaUsuario[this.listaUsuario.length]
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
     * cadstroRl()- Cadstra um novo Usuario na listaUsuarios.
     * Se ocorrer tudo certo leva o usuário para menuUsuario
     * @returns {void}
     */
    public cadastroRl():void{
        let nome = rl.question("Qual o nome de usuario? ")
        let id = this.definirNovoID(this.listaUsuario, "Usuario")
        let email = rl.question("Qual o email do cadastro? ")
        let senha:string = ""
        while(senha !== "0" && senha.length < 7){
            senha = rl.question("Qual a senha de usuario? ")
            console.info("0 -> para cancelar")
            if (senha.length < 8) {
                console.warn("A senha deve ter pelo menos 8 caracteres!");
            } 
        }
        
        try{
            this.listaUsuario.push(new Usuario(nome, id, email, senha))
            this.usuarioLogado = this.listaUsuario[this.listaUsuario.length -1]
            menuUsuario(this)
        } catch(error) {
            console.error(`Erro em this.definirNovoID(this.listaUsuario,${this.IDsRemovidos.get("Usuarios")})`)
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
        while(true){
            usuarioLogado.printarUs(this.verPostsPorQuantidade(postagens,quantidade))
            console.info("Ver mais: -1\nVoltar: -2\nSelecionar post: ID da postagem")
            let resposta = rl.questionInt("Retorno: ")
            if(resposta = -2){
                teste = false
                console.clear()
            } else if(resposta = -1){
                console.clear()
                quantidade += 10
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

    pesquisarUsuariosRl(usuarioLogado:Usuario){
        let teste = true
        while(teste){
            console.log("0. voltar")
            console.log("1. pesuisar")

            let opcao = rl.questionInt("Digite a opcao: ")
            switch(opcao){
                case 0: teste = false; break;
                case 1: 
                console.clear()
                    let nomePesquisado = rl.question("Digite o nome: ")
                    usuarioLogado.printarUs(this.listaUsuario.filter(usuario =>
                        usuario.getNome().toLowerCase().includes(nomePesquisado.toLowerCase())))
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