import { ICourse } from "./ICourse";
import { IClasses } from "./IClasses";

export interface IReaction {
  id?: number;
  user: IUser;
  course: ICourse;
}

export interface IRequestReaction {
  title: string;
  description: string;
  url: string;
  courseId: number; // Para receber o ID do curso associado
}

export interface IReactionRepository {
  create(data: IClasses): Promise<IClasses>;
  findById(id: number): Promise<IClasses | null>;
  findByIds(number: []): Promise<IClasses[] | null>;
  findAll(): Promise<IClasses[]>;
  update(id: number, data: IClasses): Promise<IClasses>;
  delete(id: number): Promise<void>;
}
