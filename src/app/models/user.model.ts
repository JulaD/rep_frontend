import {
  IAuth,
  IRegister,
  IUser
} from '../interfaces/user.interface';

export class Auth implements IAuth {
  email: string;
  password: string;
};

/*export class User implements IUser {
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
};*/

export class User implements IUser {
  id: number;
  name: string;
  email: string;
  organization: string;
  type: number;
  status: number;
  active: boolean;
  createdAt: Date;
};

export class Register implements IRegister {
  name: string;
  email: string;
  organization: string;
  password: string;
  passwordConf: string;
}