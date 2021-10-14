export interface IAuth {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  organization: string;
  type: number;
  status: number;
  active: boolean;
  createdAt: Date;
}

export interface IRegister {
  name: string;
  email: string;
  organization: string;
  password: string;
}
