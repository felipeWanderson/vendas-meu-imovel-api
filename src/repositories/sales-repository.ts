import {
  Prisma,
  Sale as SalePrisma,
  UserSaleRole,
  ClientSaleRole,
  StatusSale,
  Client as ClientPrisma,
  Property as PropertyPrisma,
  User as UserPrisma,
  Builder as BuilderPrisma
} from '@prisma/client'

export interface Property extends PropertyPrisma {
  builder?: BuilderPrisma
} 
export interface User {
  role: UserSaleRole
  user_id: string
  User?: UserPrisma
}
export interface Client {
  role: ClientSaleRole
  client_id: string
  Client?: ClientPrisma
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
  plant_property_id?: string | null;
  negotiation?: Prisma.InputJsonValue;
  users?: User[];
  clients?: Client[];
}

export interface Sale extends SalePrisma {
  users?: User[]
  clients?: Client[]
  plant_property?: Property
}

export interface QueriesSales {
  id?: string,
  status?: string,
  seller?: string,
  pickup?: string,
  client?: string,
  manager?: string,
  property?: string,
}

interface FindyManyResponse {
  sales: Sale[]
  total: number
}
export interface SalesRepository {
  create(data: CreateSaleInput): Promise<Sale>
  findById(id: string): Promise<Sale | null>
  findMany(query: QueriesSales, page: number, perPage: number): Promise<FindyManyResponse>
  findAll(query: QueriesSales): Promise<FindyManyResponse>
  update(id: string, data: Prisma.SaleUpdateInput): Promise<Sale>;
  delete(id: string, fall_motive: string): Promise<Sale>
}
