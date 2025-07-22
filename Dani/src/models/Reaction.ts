import { Classes } from './Classes';
import { Course } from './Course';

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
import { User } from './User';
  

export class Reaction{

    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    idUser:number;

    @ManyToOne(() => User, (user:User) => user.reactions)
    user:User

    @Column({type:'varchar', length: 7})
    reacao: "like" | "dislike";

    @ManyToOne(() => Course, (course) => course.reactions, { nullable:true })
    course?:Course;

    @ManyToOne(() => Course, (classes) => classes.reactions, { nullable:true })
    classes?:Classes;

    constructor(user:User, reacao:"like" | "dislike"){
        this.user = user;
        this.reacao = reacao;
    }
    
}