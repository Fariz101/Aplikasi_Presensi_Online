import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { username } });
    if (user && (await this.bcrypt.comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, username, password, role } = createUserDto;
      const createUser = await this.prisma.user.create({
        data: {
          name,
          username,
          password: await this.bcrypt.hashPassword(password),
          role,
        },
        select: {
          id: true,
          name: true,
          username: true,
          role: true,
        },
      });
      return {
        status: 'success',
        message: 'Pengguna berhasil ditambahkan',
        data: createUser,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `error when create user: ${error.message}`,
        data: null,
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { name, username, password, role } = updateUserDto;
      const findUser = await this.prisma.user.findFirst({
        where: { id: id },
      });
      if (!findUser) {
        return {
          status: 'error',
          message: 'User does not exists',
          data: null,
        };
      }
      const updateUser = await this.prisma.user.update({
        where: { id: id },
        data: {
          name: name ?? findUser.name,
          username: username ?? findUser.username,
          password: password
            ? await this.bcrypt.hashPassword(password)
            : findUser.password,
          role: role ?? findUser.role,
        },
        select: {
          id: true,
          name: true,
          username: true,
          role: true,
        },
      });
      return {
        status: 'success',
        message: 'Pengguna berhasil diubah',
        data: updateUser,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `error when update user: ${error.message}`,
        data: null,
      };
    }
  }

  async findOne(id: number) {
    try {
      const users = await this.prisma.user.findFirst({
        where: { id: id },
        select: {
          id: true,
          name: true,
          username: true,
          role: true,
        },
      });
      if (!users) {
        return {
          status: 'error',
          message: 'User does not exists',
          data: null,
        };
      }
      return {
        status: 'success',
        data: users,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `error when get user: ${error.message}`,
        data: null,
      };
    }
  }
}
