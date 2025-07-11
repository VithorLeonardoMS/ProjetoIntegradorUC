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

constructor(title: string,description: string,imageUrl: string){
this.title = title;
this.description = description;
this.imageUrl = imageUrl;
}
}
