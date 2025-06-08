import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepos: Repository<User>,
  ) { }
  create(createUserInput: CreateUserInput) {
    const createUser = this.userRepos.create(createUserInput);
    return this.userRepos.save(createUser);
  }

  findAll() {
    return this.userRepos.find();
  }

  async findOne(id: number) {
    const user = await this.userRepos.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepos.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${email} not found`);
    }
    return user;
  }

  async existEmailOrNo(email: string) {
    return this.userRepos.existsBy({
      email
    });
  }

}
