import { Comentario } from "../classes/Comentario"
import { Aula } from "../classes/Postagem/Aula"
import { CursoExterno } from "../classes/Postagem/CursoExterno"
import { CursoInterno } from "../classes/Postagem/CursoInterno"
import { Postagem } from "../classes/Postagem/Postagem"
import { Resposta } from "../classes/Resposta"
import { Usuario } from "../classes/Usuario"
import { menuUsuario } from "../view/menuUsuario"

const rl = require("readline-sync")

export class RedeMain{
    private usuarioLogado:Usuario
    private listaUsuario:Usuario[]
    private listaAula:Aula[]
    private listaCursoExterno:CursoExterno[]
    private listaCursoInterno:CursoInterno[]
    private listaPostagem:Postagem[]

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
     * ele pode tentar novamente 4 vezes, digitando 0 ele cancela a operação.
     * Leva uma função de callback que executa o que for desejado com a senha que o usuario incerir,
     * a função de callback retorna uma boolean, caso retorne true o processo encerra.
     * Se a função de callback retornar true, o nétodo também retorna true
     * @param {Usuario} usuario 
     * @param callback 
     * @returns {boolean}
     */
    private optionSenha(usuario:Usuario, callback:(senhaTestando:string) => boolean):boolean{
        let senhaTeste:string = '1'
        let contagem = 4
        while(senhaTeste != "0" && contagem != 0){
            console.info("0 -> para cancelar")
            senhaTeste = rl.question("Digite sua senha: ",{hideEchoBack:true});
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
        const rlEmail = rl.question("Qual o e-mail para login? ");
        const usFind = this.listaUsuario.find(usAtual => usAtual.getEmail() == rlEmail);
        if(usFind){
            this.optionSenha(usFind,(senhaTeste)=>{
                if(this.setUsuarioLogado(usFind,senhaTeste)){
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
        try{
            this.listaUsuario.push(new Usuario(
                rl.question("Qual o nome de usuario? "),
                this.definirNovoID(this.listaUsuario,this.IDsRemovidos.get("Usuarios")),
                rl.question("Qual o email do cadastro? "),
                rl.question("Qual a senha de usuario? ")
            ))
            menuUsuario(this)
        } catch(error) {
            console.error(`Erro em this.definirNovoID(this.listaUsuario,${this.IDsRemovidos.get("Usuarios")})`)
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


    definirNovoID(lista:Comentario[] | Resposta[] | Usuario[] | Aula[] | CursoExterno[] | CursoInterno[] | Postagem[], idsRemovidos?:number):number{
        if((lista[0] instanceof Resposta || lista[0] instanceof Comentario) && idsRemovidos){
            return lista.length + idsRemovidos
        } else if(lista[0] instanceof Usuario){
            let retorno = this.IDsRemovidos.get('Usuarios')
            return (retorno? retorno:0) + lista.length
        } else if(lista[0] instanceof Aula){
            let retorno = this.IDsRemovidos.get('Aula')
            return (retorno? retorno:0) + lista.length
        } else if(lista instanceof Usuario){// ver se lista é analizada corretamente pois é uma array
            let retorno = this.IDsRemovidos.get('Usuarios')
            return (retorno? retorno:0) + lista.length  
        } else if(lista[0] instanceof Usuario){
            let retorno = this.IDsRemovidos.get('Usuarios')
            return (retorno? retorno:0) + lista.length
        } else if(lista[0] instanceof Usuario){
            let retorno = this.IDsRemovidos.get('Usuarios')
            return (retorno? retorno:0) + lista.length
        } else{
            throw new Error(`Erro em definirNovoID(${lista}, ${idsRemovidos})`);
            return -1
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