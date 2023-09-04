import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(createUser: CreateUserDto) {
    return this.userRepository.create(createUser);
  }
}
