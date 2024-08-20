import { User } from '@prisma/client';

export class UserModel implements User {
  id: string;
  email: string;
  password: string;
  name: string;
  fantasyName: string;
  CPF: string;
  CNPJ: string;
  active: boolean;
  phoneNumberFirst: string;
  phoneNumberSecond: string;
  phoneNumberThird: string;
  createdAt: Date;
  updatedAt: Date;
  addressId: string;
  address: string;
  clients: Array<object>;
  products: Array<object>;
  orders: Array<object>;
  _count: Array<object>;
}
