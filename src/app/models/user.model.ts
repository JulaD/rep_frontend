/* eslint-disable max-classes-per-file */
import {
  IAuth,
  IRegister,
  IUser,
} from '../interfaces/user.interface';

export class Auth implements IAuth {
  email: string;

  password: string;
}

export class User implements IUser {
  id: number;

  name: string;

  email: string;

  organization: string;

  type: number;

  status: number;

  active: boolean;

  createdAt: Date | string;
}

export class Register implements IRegister {
  name: string;

  email: string;

  organization: string;

  password: string;

  passwordConf: string;
}
