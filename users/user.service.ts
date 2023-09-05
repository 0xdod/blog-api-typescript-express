import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(createUser: CreateUserDto) {
    const createdUser = await this.userRepository.create(createUser);
    return { ...createdUser, password: undefined };
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ id });
  }
}
