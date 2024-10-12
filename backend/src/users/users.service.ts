import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { updateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createLocalUserDto: CreateUserDto): Promise<User> {
    const { fullName, email, password } = createLocalUserDto;
    const hashedPassword = await hash(
      password,
      this.configService.get<string>('BCRYPT_SALT'),
    );

    const newUser = this.usersRepository.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | void> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | void> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[] | void> {
    return this.usersRepository.find();
  }

  async update(id: number, updateUserDto: updateUserDto): Promise<User | void> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async getIdByEmail(email: string) {
    return (
      await this.usersRepository.findOne({ where: { email }, select: ['id'] })
    ).id;
  }
}
