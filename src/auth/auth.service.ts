import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.validateUser(dto.username, dto.password);
    if (!user) throw new UnauthorizedException('Username atau password salah');

    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return { status: 'success', message: 'Login berhasil', token: token };
  }
}