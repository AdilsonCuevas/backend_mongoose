import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CLientesSchema } from './model/cliente.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Clientes', schema: CLientesSchema }]), JwtModule],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [MongooseModule]
})
export class ClientesModule { }
