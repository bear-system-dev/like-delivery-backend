import { Prisma } from '@prisma/client';

export class UserAddressDTO implements Prisma.AddressCreateInput {
  city: string;
  complement?: string;
  country: string;
  neighborhood: string;
  number: string;
  street: string;
}
