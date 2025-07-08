

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
import { Postagem } from './Postagem';

export class AnexoPostagem {

    @PrimaryGeneratedColumn()
    id!:number;

    @ManyToOne(() => Postagem, post => post.anexos)
    postagem:Postagem;

    @Column({type:"varchar", nullable:false, length:64})
    nome:string;

    @Column({type:"text", nullable:false})
    url:string;

    constructor(postagem:Postagem, nome:string, url:string){
        this.postagem = postagem;
        this.nome = nome;
        this.url = url;
    }


}