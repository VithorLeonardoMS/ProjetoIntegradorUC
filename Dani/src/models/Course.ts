import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ICourse } from "../interfaces/ICourse";

@Entity("courses")
export class Course implements ICourse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  externalLink?: string;

  // @Column({type:"date", nullable:false})
  // public data:Date;

  // @OneToMany(() => Comentario, comentario => comentario.postagem)
  // @JoinColumn({ name: "postId" })
  // public comentarios!: Comentario[]

  

constructor(title: string,description: string,imageUrl: string){
this.title = title;
this.description = description;
this.imageUrl = imageUrl;
}
}
