import { Schema, model, Document, Types } from 'mongoose';
import { IUsuario } from '../../users/models/user.schema';

export enum Categotia {
    ADMIN = 'Nuevo',
    RECURRENTE = 'recurrente',
    POTENCIAL = 'Potencial',
    INACTIVO = 'Inactivo',
    VIP = 'VIP',
    CORPORATIVO = 'Corporativo',
    PARTICULAR = 'Corporativo'
}

export interface ICliente extends Document {
    name: string;
    email: string;
    nit: string;
    direccion: string;
    categoria: Categotia;
    telefono?: Number;
    usuario: Types.ObjectId;
    createdAt: Date;
}

export const CLientesSchema = new Schema<ICliente>(
    {
        name: {
            type: String,
            required: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100,
            lowercase: true,
            trim: true,
        },
        nit: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        categoria: {
            type: String,
            enum: Object.values(Categotia),
            default: Categotia.POTENCIAL,
        },
        telefono: {
            type: Number,
            default: null,
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

export const Usuario = model<ICliente>('Clientes', CLientesSchema);