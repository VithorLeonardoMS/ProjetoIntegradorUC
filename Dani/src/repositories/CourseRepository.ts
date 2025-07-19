import { Repository } from "typeorm";
import { ICourse, ICourseRepository } from "../interfaces/ICourse";
import { Course } from "../models/Course";
import { AppDataSource } from "../database/connection";
import { AppError } from "../utils/AppError";

export class CourseRepository implements ICourseRepository {
  private repository: Repository<Course>;

  constructor() {
    this.repository = AppDataSource.getRepository(Course);
  }

  async create(data: ICourse): Promise<ICourse> {
    const course = this.repository.create(data);
    await this.repository.save(course);
    return course;
  }

  async findById(id: number): Promise<ICourse | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ["classes"],
    });
  }

  async findAll(): Promise<ICourse[]> {
    return await this.repository.find({ relations: ["classes"] });
  }

  async update(id: number, data: ICourse): Promise<ICourse> {
    const result = await this.repository.update(id, data);
    if (result.affected === 0) {
      throw new AppError("Course not found", 404);
    }

    const updatedCourse = await this.findById(id);

    if (!updatedCourse) {
      throw new AppError("Error retrieving updated course", 500);
    }

    return updatedCourse;
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new AppError("Course not found", 404);
    }
  }
}
