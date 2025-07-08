
import { RedeMain } from "../Controlers/RedeMain"
import { optionSenha } from "../Controlers/optionSenha"
import { Comentario } from "./Comentario"
import { Postagem } from "./Postagem/Postagem"
import { ReactionPost } from "./Reactions/ReactionPost"
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
    private _senha: string;
    private senhaOriginal!: string;

    @Column({type:"text", nullable:true})
    public fotoPerfil!:string

    @ManyToMany(() => Postagem, (postagem) => postagem.usersSaves)//Implementar
    @JoinTable({
        name: "Postagens_Salvas", // nome da tabela intermediária
        joinColumn: {
          name: "ID_Usuario",
          referencedColumnName: "id"
        },
        inverseJoinColumn: {
          name: "ID_Postagem",
          referencedColumnName: "id"
        }
    })
    public postsSalvos: Postagem[] = []

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    public postsCriados: Postagem[] = []

    @OneToMany(() => Comentario, coment => coment.usuario)
    public comentarios!: Comentario[]

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
      this.senhaOriginal = this._senha;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this._senha !== this.senhaOriginal) {
        const salt = await bcrypt.genSalt(10);
        this._senha = await bcrypt.hash(this._senha, salt);
      }
    }

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this._senha = senha;
        this.senhaOriginal = ""
    }

    get senha():string{
        return this._senha;
    }
}