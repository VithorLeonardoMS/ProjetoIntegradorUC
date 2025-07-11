import { ICourse } from "../interfaces/ICourse";
import { CourseRepository } from "../repositories/CourseRepository";
import { AppError } from "../utils/AppError";

export class CourseService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async createCourse(data: ICourse): Promise<ICourse> {
    this.validateCourseData(data);
    return await this.courseRepository.create(data);
  }

  async getCourseById(id: number): Promise<ICourse> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    return course;
  }

  async getAllCourses(): Promise<ICourse[]> {
    return await this.courseRepository.findAll();
  }

  async updateCourse(id: number, data: ICourse): Promise<ICourse> {
    this.validateCourseData(data);
    return await this.courseRepository.update(id, data);
  }

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }

  private validateCourseData(data: ICourse): void {
    if (!data.title || data.title.trim() === "") {
      throw new AppError("Title is required", 400);
    }

    if (!data.description || data.description.trim() === "") {
      throw new AppError("Description is required", 400);
    }

    if (!data.imageUrl || data.imageUrl.trim() === "") {
      throw new AppError("Image URL is required", 400);
    }
  }
}
