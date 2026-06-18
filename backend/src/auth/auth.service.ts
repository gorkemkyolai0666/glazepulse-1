import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new UnauthorizedException('Bu e-posta adresi zaten kayıtlı');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const bindery = await this.prisma.bindery.create({
      data: {
        name: dto.binderyName,
        phone: dto.phone,
        city: dto.city,
        state: dto.state,
        users: {
          create: {
            email: dto.email,
            passwordHash,
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: 'owner',
          },
        },
      },
      include: { users: true },
    });

    const user = bindery.users[0];
    const token = this.generateToken(user.id, user.email, bindery.id);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      bindery: {
        id: bindery.id,
        name: bindery.name,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { bindery: true },
    });

    if (!user) {
      throw new UnauthorizedException('Geçersiz giriş bilgileri');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Geçersiz giriş bilgileri');
    }

    const token = this.generateToken(user.id, user.email, user.binderyId);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      bindery: {
        id: user.bindery.id,
        name: user.bindery.name,
      },
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { bindery: true },
    });

    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      bindery: {
        id: user.bindery.id,
        name: user.bindery.name,
        phone: user.bindery.phone,
        city: user.bindery.city,
        state: user.bindery.state,
        totalPresses: user.bindery.totalPresses,
      },
    };
  }

  private generateToken(userId: string, email: string, binderyId: string): string {
    return this.jwtService.sign({ sub: userId, email, binderyId });
  }
}
