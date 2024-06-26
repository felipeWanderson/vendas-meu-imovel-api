import {
  Prisma,
  Sale as SalePrisma,
  UserSaleRole,
  ClientSaleRole,
  StatusSale,
} from '@prisma/client'

export interface User {
  role: UserSaleRole
  user_id: string
}
export interface Client {
  role: ClientSaleRole
  client_id: string
}
export interface CreateSaleInput extends Prisma.SaleUncheckedCreateInput {
  users?: Prisma.SaleUserCreateNestedManyWithoutSaleInput
  clients?: Prisma.SaleClientCreateNestedManyWithoutSaleInput
}

export interface UpdateSale {
  status?: StatusSale;
  single_property?: string | null;
  unity?: string;
  amount?: number;
  date_sale?: string;
  act?: number;
  pay_date_act?: string;
  fall_motive?: string;
  plant_property_id?: string;
  negotiation?: Prisma.InputJsonValue; // Add this line
  users?: User[];
  clients?: Client[];
}

export interface Sale extends SalePrisma {
  users?: User[]
  clients?: Client[]
}

export interface QueriesSales {
  id?: string,
  status?: string,
  realtor?: string,
  client?: string,
  manager?: string,
  property?: string,
}
export interface SalesRepository {
  create(data: CreateSaleInput): Promise<Sale>
  findById(id: string): Promise<Sale | null>
  findMany(query: QueriesSales, page: number): Promise<Sale[]>
  update(id: string, data: Prisma.SaleUpdateInput): Promise<Sale>;
  delete(id: string): Promise<Sale>
}
