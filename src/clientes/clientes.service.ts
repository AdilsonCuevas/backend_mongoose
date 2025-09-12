import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICliente } from './model/cliente.schema';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {

  constructor(
    @InjectModel('Clientes') private clienteModel: Model<ICliente>,
  ) { }

  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente = new this.clienteModel({
        ...createClienteDto,
      });
      return await cliente.save();

    } catch (error) {
      throw new BadRequestException("Error registro de usuario " + error);
    };

  }

  async findAll() {
    return await this.clienteModel.find().exec();
  }

  async findOne(id: string) {
    return await this.clienteModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    return await this.clienteModel.findByIdAndUpdate(id, updateClienteDto, { new: true }).exec();
  }

  async remove(id: string) {
    return await this.clienteModel.findByIdAndDelete(id).exec();
  }
}
