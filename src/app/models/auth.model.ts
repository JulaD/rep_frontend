import {
  IAuth,
} from '../interfaces/user.interface';

export class Auth implements IAuth {
  email: string;

  password: string;
}
