import { Comentario } from "../model/Comentario"
import { Aula } from "../model/Postagem/Aula"
import { CursoExterno } from "../model/Postagem/CursoExterno"
import { CursoInterno } from "../model/Postagem/CursoInterno"
import { Postagem } from "../model/Postagem/Postagem"
import { Resposta } from "../model/Resposta"
import { Usuario } from "../model/Usuario"
import { menuUsuario } from "../view/menuUsuario"

const rl = require("readline-sync")

export class RedeMain{

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
    public IDsRemovidos: Map<string, number> = new Map<string, number>
    constructor(){
        //Definindo as chaves
        this.IDsRemovidos.set('Usuario',0)
        this.IDsRemovidos.set('Aula',0)
        this.IDsRemovidos.set('CursoExterno',0)
        this.IDsRemovidos.set('CursoInterno',0)
        this.IDsRemovidos.set('Postagem',0)
    }


    getListaUsuarios():Usuario[]{return this.listaUsuario}

    getListaAulas():Aula[]{return this.listaAula}

    getListaCursoExternos():CursoExterno[]{return this.listaCursoExterno}

    getListaCursoInterno():CursoInterno[]{return this.listaCursoInterno}

    getListaPostagem():Postagem[]{return this.listaPostagem}

    getUsuario(idUsuario:number):Usuario | undefined{
        return this.listaUsuario.find(usuarioAtual => usuarioAtual.getIDUsuario() == idUsuario)
    }

    private listaVazia():void{
        console.warn("Sem Valores.")
    }

    private indiceExiste(indice:number,array:any[]):Boolean{
        if(indice < 0){
            console.error("Valor Negativo")
        } else if(indice > array.length){
            console.error("Valor maior que o possivel.")
        } else{
            return true
        }
        return false
    }

    public login():boolean{
        const rlEmail = rl.question("Qual o e-mail para login? ")
        const usFind = this.listaUsuario.find(usAtual => usAtual.getEmail() == rlEmail)
        if(usFind?.logar(
            rl.question("Digite sua senha: ",{hideEchoBack:true})
        )){
            menuUsuario(this,usFind)
            return true
        }
        if(usFind){
            console.warn("Senha incorreta.")

        }
        console.warn("Email não encontrado. ")
        return false
    }

    public cadastro():boolean{
        try{
            this.listaUsuario.push(new Usuario(
                rl.question("Qual o nome de Usuario? "),
                this.definirNovoID(this.listaUsuario,this.IDsRemovidos.get("Usuarios")),
                rl.question("Qual o email do cadastro? "),
                rl.question("Qual a senha de usuario? ")
            ))
            return true
        } catch(error) {
            console.error(`Erro no Cadastro.`)
            return false
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