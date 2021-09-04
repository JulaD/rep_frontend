export interface IAuth {
  email: string;
  password: string;
};

export interface IUser {
  id: number;
  name?: string;
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
};

export interface IRegister {
  name: string;
  email: string;
  organization: string;
  password: string;
}