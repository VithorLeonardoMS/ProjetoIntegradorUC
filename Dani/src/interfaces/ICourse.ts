export interface ICourse {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  externalLink?: string;
}

export interface ICourseRepository {
  create(data: ICourse): Promise<ICourse>;
  findById(id: number): Promise<ICourse | null>;
  findAll(): Promise<ICourse[]>;
  update(id: number, data: ICourse): Promise<ICourse>;
  delete(id: number): Promise<void>;
}
