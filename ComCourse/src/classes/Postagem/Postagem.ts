import { RedeMain } from "../../Controlers/RedeMain"
import { Comentario } from "../Comentario"
import { Usuario } from "../Usuario"


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
import { AnexoPostagem } from "./AnexoPostagem";

export class Postagem {
    //protected redeMain!:RedeMain

    @PrimaryGeneratedColumn()
    public id!: number

    @ManyToOne(() => Usuario, (usuario) => usuario.postsCriados)
    @JoinColumn({name:"idUsuario"})
    public usuario: Usuario

    @ManyToMany(() => Usuario, usuario => usuario.postsSalvos)
    public usersSaves:Usuario[] = []

    @Column({type:"varchar", length:64, nullable:false})
    public titulo: string

    @Column({type:"varchar", length:256, nullable:true})
    public descricao!: string

    @OneToMany(() => Comentario, comentario => comentario.postagem)
    @JoinColumn({ name: "postId" })
    public comentarios!: Comentario[]

    @Column({type:"date", nullable:false})
    public data:Date;

    @OneToMany(() => AnexoPostagem, anexo => anexo.postagem)
    public anexos!: AnexoPostagem[]

    /**
     *  cargaHoraria -> Valor salvo como minutos que representa o tempo nescesário para concluir a atividade da postagem
     */
    @Column({type:"number",nullable:true, length:4})
    public cargaHoraria!:number

    constructor(usuario:Usuario, titulo:string, descricao?: string, anexos?: AnexoPostagem[], cargaHoraria?:number) {
        this.usuario = usuario;
        this.titulo = titulo
        this.data = new Date();

        if(anexos){
            this.anexos = anexos;
        }

        if(descricao){
            this.descricao = descricao
        }

        if(cargaHoraria){
            this.cargaHoraria = cargaHoraria;
        }
    }
}