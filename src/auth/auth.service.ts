import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    const matchPwd = user.password === loginDto.password;
    if (!matchPwd) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = {
      email: user.email,
      id: user.id,
    }
    return {
      token: this.jwtService.sign(payload),
      ...user,
    }
  }

  async register(createUserDto: CreateUserInput) {
    const existEmail = await this.usersService.existEmailOrNo(createUserDto.email);
    if (existEmail) {
      throw new ConflictException('Email already exists');
    }
    const user = await this.usersService.create(createUserDto);
    const payload = {
      email: user.email,
      id: user.id,
    }
    return {
      token: this.jwtService.sign(payload),
      ...user,
    }
  }
}
