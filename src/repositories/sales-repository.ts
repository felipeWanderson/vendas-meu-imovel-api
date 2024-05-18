import {
  Prisma,
  Sale as SalePrisma,
  UserSaleRole,
  ClientSaleRole,
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
export interface UpadateSaleInput extends Prisma.SaleUncheckedUpdateInput {
  users?: Prisma.SaleUserCreateNestedManyWithoutSaleInput
  clients?: Prisma.SaleClientCreateNestedManyWithoutSaleInput
}

export interface Sale extends SalePrisma {
  users?: User[]
  clients?: Client[]
}
export interface SalesRepository {
  create(data: CreateSaleInput): Promise<Sale>
  update(id: string,data: UpadateSaleInput): Promise<Sale>
  findById(id: string ): Promise<Sale | null>
}
