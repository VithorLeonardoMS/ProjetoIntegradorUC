import { ICourse, IRequestUser } from "../interfaces/ICourse";
import { IUser } from "../interfaces/IUser";
import { ClassesRepository } from "../repositories/ClassesRepository";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";

export class UserService {
  private userRepository: UserRepository;
  //private classRepository: ClassesRepository;

  constructor() {
    this.userRepository = new UserRepository();
    //this.classRepository = new ClassesRepository();
  }

  async createUser(data: IRequestUser): Promise<ICourse> {
    this.validateUserData(data);
    // Obtenha os IDs das aulas e busque as aulas correspondentes no banco
    let classes;
    if (data.classesId && data.classesId.length > 0) {
      classes = await this.classRepository.findByIds(data.classesId); // Supondo que exista um repositório para Classes
    }

    const userData:IUser = {
      id?: data;//Continuar
      name: string;
      email: string;
      password: string;
      profileUrl?: string;
      createdCourses: ICourse[],
      reactions: IReaction[]
    };
    return await this.userRepository.create(courseData);
  }

  async getUserById(id: number): Promise<ICourse> {
    const course = await this.userRepository.findById(id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    return course;
  }

  async updateUser(id: number, data: IRequestUser): Promise<ICourse> {
    this.validateUserData(data);
    // Obtenha os IDs das aulas e busque as aulas correspondentes no banco
    let classes;
    if (data.classesId && data.classesId.length > 0) {
      classes = await this.classRepository.findByIds(data.classesId); // Supondo que exista um repositório para Classes
    }

    const userData:IUser = {
        
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
