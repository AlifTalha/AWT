import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, fullName: string, isActive: boolean = false): Promise<User> {
    const user = this.userRepository.create({ username, fullName, isActive });
    return await this.userRepository.save(user);
  }

//   async getUsersByFullNameSubstring(substring: string): Promise<User[]> {
//     return await this.userRepository
//       .createQueryBuilder('user')
//       .where('user.fullName LIKE :substring', { substring: `%${substring}%` })
//       .getMany();
//   }

async getUsersByFullNameSubstring(substring: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.fullName LIKE :substring', { substring: '%${substring}%' })
      .getMany();
  }


  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async removeUserByUsername(username: string): Promise<void> {
    await this.userRepository.delete({ username });
  }
}
