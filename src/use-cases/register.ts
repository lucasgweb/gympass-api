import { IUsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists';

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({email, name, password}: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 4);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash
    });
  }
}