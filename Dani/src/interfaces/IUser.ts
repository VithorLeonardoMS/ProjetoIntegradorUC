import { IClasses } from "./IClasses";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  profileUrl?: string;
}

export interface IRequestUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  profileUrl?: string;  
}

export interface IUserRepository {
  create(data: ICourse): Promise<ICourse>;
  findById(id: number): Promise<ICourse | null>
  update(id: number, data: ICourse): Promise<ICourse>;
  delete(id: number): Promise<void>;
}
