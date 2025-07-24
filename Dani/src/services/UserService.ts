import { ICourse, IRequestCourse } from "../interfaces/ICourse";
import { IUser, IRequestUser } from "../interfaces/IUser";
import { Reaction } from "../models/Reaction";
import { ReactionRepository } from "../repositories/ReactionRespository";
import { ClassesRepository } from "../repositories/ClassesRepository";
import { CourseRepository } from "../repositories/CourseRepository";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";

export class UserService {
  private userRepository: UserRepository;
  private courseRepository: CourseRepository;
  private reactionRepository: ReactionRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.courseRepository = new CourseRepository();
  }

  async createUser(data: IRequestUser): Promise<IUser> {
    this.validateUserData(data);

    let createdCourses;
    if (data.createdCoursesIds && data.createdCoursesIds.length > 0) {
      createdCourses = await this.courseRepository.findByIds(data.createdCoursesIds);
    }

    let reactions;
    if (data.reactionsIds && data.reactionsIds.length > 0) {
      createdCourses = await this.reactionRepository.findByIds(data.reactionsIds);
    }

    const userData:IUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      profileUrl: data.profileUrl,
      createdCourses: createdCourses? createdCourses : [],
      reactions: reactions? reactions : []
    };
    return await this.userRepository.create(userData);
  }

  async getUserById(id: number): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async updateUser(id: number, data: IRequestUser): Promise<IUser> {
    this.validateUserData(data);

    let createdCourses;
    if (data.createdCoursesIds && data.createdCoursesIds.length > 0) {
      createdCourses = await this.courseRepository.findByIds(data.createdCoursesIds);
    }

    let reactions;
    if (data.reactionsIds && data.reactionsIds.length > 0) {
      createdCourses = await this.reactionRepository.findByIds(data.reactionsIds);
    }


    const userData:IUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      profileUrl: data.profileUrl,
      createdCourses: createdCourses? createdCourses : [],
      reactions: reactions? reactions : []
    };

    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  /**
   * Valida os dados do usuário, garantindo que estejam corretos.
   */
  private validateUserData(data: IRequestUser): void {
    if (!data.name || data.name.trim() === "") {
      throw new AppError("Title is required", 400);
    }

    if (!data.email || data.email.trim() === "") {
      throw new AppError("Email is required", 400);
    }

    if (!data.password || data.password.trim() === "") {
      throw new AppError("Image URL is required", 400);
    }
  }
}
