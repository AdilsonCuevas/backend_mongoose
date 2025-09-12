
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from 'src/users/dto/users.dto';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsuario } from '../users/models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel('Usuarios') private usuarioModel: Model<IUsuario>,
  ) { }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      username: user.email,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      sub: user.id
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret:
            this.configService.get('JWT_SECRET'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7h',
          secret:
            this.configService.get('JWT_REFRESH'),
        }),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: {
        Lastname: user.sub,
      },
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret:
            this.configService.get('JWT_SECRET'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7h',
          secret:
            this.configService.get('JWT_REFRESH'),
        }),
      },
    };
  }

  async register(dto: CreateUsuarioDto) {
    try {
      const hashPass = await hash(dto.password, 10);
      const user = new this.usuarioModel({
        ...dto,
        password: hashPass,
      });
      return await user.save();

    } catch (error) {
      throw new BadRequestException("Error registro de usuario " + error);
    };
  }

  async dashboard(role: string, email: string) {

  }


  async findByEmail(email: string) {
    return await this.usuarioModel.findOne({ email }).exec();
  }
}
