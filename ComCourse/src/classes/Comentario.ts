import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn
 } from 'typeorm';
  
  
  @Entity("comentario")
  export class Comentario {
    @PrimaryGeneratedColumn()
    id!: number;
  
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

    constructor(texto:string, parent?: Comentario){
      this.texto = texto;
      if(parent){
        this.parent = parent;
        this.parentId = parent.id;
      }
      this.respostas = [];
    }
  }
  