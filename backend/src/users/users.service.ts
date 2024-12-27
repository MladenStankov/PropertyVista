import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProfileInfo } from 'src/auth/dto/profile-info.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createLocalUserDto: CreateUserDto): Promise<User> {
    const { fullName, email, password, imageUrl } = createLocalUserDto;

    let hashedPassword: string;

    if (password) {
      hashedPassword = await hash(
        password,
        this.configService.get<string>('BCRYPT_SALT'),
      );
    }

    const newUser = this.usersRepository.create({
      fullName,
      email,
      password: password ? hashedPassword : null,
      imageUrl: imageUrl,
      isVerified: password ? false : true,
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

  async getIdByEmail(email: string) {
    return (
      await this.usersRepository.findOne({ where: { email }, select: ['id'] })
    ).id;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.usersRepository.existsBy({ email });
  }

  async upadatePassword(email: string, password: string) {
    const hashedPassword = await hash(
      password,
      this.configService.get<string>('BCRYPT_SALT'),
    );

    const user = await this.usersRepository.findOneBy({ email });
    user.password = hashedPassword;

    await user.save();
  }

  async hasPassword(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ email });
    return user.password ? true : false;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deleteExpiredRefreshTokens() {
    await this.usersRepository.delete({
      isVerified: false,
      createdAt: LessThanOrEqual(new Date(Date.now() - 30 * 60 * 1000)),
    });
  }

  async profileInfo(id: number): Promise<ProfileInfo> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: [
        'listings',
        'favourites',
        'listings.views',
        'listings.favourites',
      ],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const totalListings = user.listings.length;
    const totalFavouritedListings = user.favourites.length;

    const totalReceivedFavourites = user.listings.reduce(
      (sum, listing) => sum + listing.favourites.length,
      0,
    );

    const totalViewsOnProfile = user.listings.reduce(
      (sum, listing) => sum + listing.views.length,
      0,
    );

    return {
      fullName: user.fullName,
      email: user.email,
      imageUrl: user.imageUrl ?? '',
      totalListings,
      totalChats: 0, //TDO
      totalFavouritedListings,
      totalReceivedFavourites,
      totalViewsOnProfile,
    };
  }
}
