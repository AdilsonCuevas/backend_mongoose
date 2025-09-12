import { Schema, model, Document } from 'mongoose';

export enum Roles {
  ADMIN = 'admin',
  LECTOR = 'lector',
}

export interface IUsuario extends Document {
  name: string;
  email: string;
  password: string;
  role: Roles;
  avatar?: string;
  createdAt: Date;
}

export const UsuarioSchema = new Schema<IUsuario>(
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.LECTOR,
    },
    avatar: {
      type: String,
      default: null,
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


export const Usuario = model<IUsuario>('Usuarios', UsuarioSchema);
