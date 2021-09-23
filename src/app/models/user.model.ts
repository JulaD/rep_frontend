import {
  IUser,
} from '../interfaces/user.interface';

export class User implements IUser {
  id: number;

  name: string;

  email: string;

  password: string;

  type: number;

  extension?: string;

  token?: string;

  status: number;

  subscribed: boolean;

  active: boolean;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;
}
