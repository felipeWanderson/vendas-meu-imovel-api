import { Prisma, Property } from '@prisma/client'

export interface QueriesProperty {
  name?: string
}

export interface PropertyAddress {
  postalCode: string,
  address1: string,
  address2: string,
  address3?: string,
  neighborhood: string,
  city: string,
  state: string
}

export interface CreateProperty extends  Prisma.PropertyUncheckedCreateInput {
  address: {
    postalCode: string,
    address1: string,
    address2: string,
    address3?: string,
    neighborhood: string,
    city: string,
    state: string
  }
}
export interface PropertyRepository {
  findById(id: string): Promise<Property | null>
  findByName(email: string): Promise<Property | null>
  findMany(query: QueriesProperty, page: number): Promise<Property[]>
  create(data: CreateProperty): Promise<Property>
  update(id: string, data: Prisma.PropertyUncheckedUpdateInput): Promise<Property>
  delete(id: string): Promise<Property>
}
