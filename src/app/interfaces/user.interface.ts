export interface IAuth {
  email: string;
  password: string;
}

/*export interface IUser {
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
<<<<<<< HEAD
};*/

export interface IUser {
  id: number;
  name: string;
  email: string;
  organization: string;
  type: number;
  status: number;
  active: boolean;
  createdAt: Date;
};

export interface IRegister {
  name: string;
  email: string;
  organization: string;
  password: string;
}

