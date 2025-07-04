import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    OneToOne
 } from 'typeorm';
import { Postagem } from './Postagem/Postagem';
  
  
  @Entity("comentario")
  export class Comentario {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(()=> Postagem, post => post.comentarios)
    postagem:Postagem;
  
    @Column()
    usuarioId!: number;
  
    @Column({type:"varchar", length:255, nullable:false})
    texto: string;
  
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataCriacao!: Date;
  
    // Relacionamento com o comentário pai (resposta)
    @ManyToOne(() => Comentario, (comentario) => comentario.respostas, { nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent!: Comentario;
  
    @Column({ type: 'int', nullable: true })
    parentId!: number;
  
    // Relacionamento com as respostas (comentários filhos)
    @OneToMany(() => Comentario, (comentario) => comentario.parent)
    respostas: Comentario[];

    constructor(postagem:Postagem, texto:string, parent?: Comentario){
      this.postagem = postagem;
      this.texto = texto;
      if(parent){
        this.parent = parent;
        this.parentId = parent.id;
      }
      this.respostas = [];
    }
  }
  