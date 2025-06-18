
import { RedeMain } from "../Controlers/RedeMain"
import { optionSenha } from "../Controlers/optionSenha"
import { Comentario } from "./Comentario"
import { Aula } from "./Postagem/AulaAntigo"
import { CursoExterno } from "./Postagem/CursoExterno"
import { CursoInterno } from "./Postagem/CursoInterno"
import { Postagem } from "./Postagem/Postagem"
import { ReactionPost } from "./Reactions/ReactionPost"
import { Resposta } from "./RespostaAntigo"
import bcrypt from "bcryptjs"

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    AfterLoad,
    BeforeInsert,
    BeforeUpdate
 } from 'typeorm';
  
export class Usuario {

    @PrimaryGeneratedColumn()
    public id!: number

    @Column({type:"varchar", length:200})
    public nome: string

    @Column({type:"varchar", unique:true, length:200})
    public email: string

    @Column({type:"varchar", length:35})
    public _senha: string;
    private senhaOriginal!: string;
  

    @Column({type:"text", nullable:true})
    public fotoPerfil!:string

    @ManyToMany(() => Postagem, (postagem) => postagem.usersSaves)//Implementar
    @JoinTable({
        name: "Postagens_Salvas", // nome da tabela intermediária
        joinColumn: {
          name: "ID_Usuario",
          referencedColumnName: "ID"
        },
        inverseJoinColumn: {
          name: "ID_Postagem",
          referencedColumnName: "ID"
        }
    })
    public postsSalvos: Postagem[] = []


    @OneToMany(() => Postagem, (postagem) => postagem.IDUsuario)
    public postsCriados: Postagem[] = []

    @OneToMany(() => ReactionPost, (reacao) => reacao.idUsuario)
    public reacaoPost: ReactionPost[]= []

    @ManyToMany(() => Usuario, (user) => user.seguidores)
    @JoinTable({
        name:"User_Follow_User",
        joinColumn: {
            name: "seguidor_id", 
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "seguido_id", // o outro usuário que é seguido
            referencedColumnName: "id"
        }
    })
    public seguidores: Usuario[] = []

    @AfterLoad()
    setOriginalPassword() {
      this.senhaOriginal = this.senha;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.senha !== this.senhaOriginal) {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
      }
    }

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this._senha = senha;
        this.senhaOriginal = ""
    }

    /**
     * Evita que senhaOriginal seja vazia quando a classe não for pegada do banco de dados
     */
    set senha(novaSenha: string) {
        this.senha = novaSenha;
        this.senhaOriginal = ''; 
    }

    get senha():string{
        return this.senha;
    }

    /**
     * hasLike() -> Retorna se o objeto já recebeu like por este usuário
     * 
     * @param {Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta} objeto 
     * @returns {boolean}
     */
    hasLike(objeto: Comentario | CursoExterno | CursoInterno | Aula | Postagem | Resposta): boolean {
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