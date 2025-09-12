import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsuario } from './models/user.schema';
import { hash } from 'bcrypt';
import { CreateUsuarioDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('Usuarios') private usuarioModel: Model<IUsuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<IUsuario> {

    try {
      const hashPass = await hash(createUsuarioDto.password, 10);
      const user = new this.usuarioModel({
        ...createUsuarioDto,
        password: hashPass,
      });
      return await user.save();

    } catch (error) {
      throw new BadRequestException("Error registro de usuario " + error);
    };

  }

  async findAll(): Promise<IUsuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOne(id: string): Promise<IUsuario | null> {
    return this.usuarioModel.findOne({ id }).exec();
  }

  async eliminar(id: string): Promise<IUsuario | null> {
    return this.usuarioModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, data: UpdateUserDto): Promise<IUsuario | null> {
    return this.usuarioModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
