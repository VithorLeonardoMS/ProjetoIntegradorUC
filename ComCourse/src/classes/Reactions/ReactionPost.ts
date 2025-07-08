import { Postagem } from '../Postagem/Postagem';

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable
 } from 'typeorm';
  

export class ReactionPost{

    @Column()
    idUsuario:number;

    @Column()
    reacao: "like" | "dislike";

    @Column()
    idPostagem:number;

    constructor(idUsuario:number, idPostagem:number, reacao:"like" | "dislike"){
        this.idUsuario = idUsuario;
        this.idPostagem = idPostagem;
        this.reacao = reacao;
    }
}