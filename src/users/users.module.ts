import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './models/user.schema';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Usuarios', schema: UsuarioSchema }]), JwtModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [MongooseModule]
})
export class UsersModule { }
