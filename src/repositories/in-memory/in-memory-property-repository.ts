import { randomUUID } from 'crypto'
import { Builder, Prisma, Property } from '@prisma/client'
import { CreateProperty, PropertyRepository, QueriesProperty } from '../property-repository'

export class InMemoryPropertiesRepository implements PropertyRepository {
  private properties: Property[] = []
  async findById(id: string) {
    const property = this.properties.find((property) => property.id === id)
    if (!property) {
      return null
    }
    return property
  }

  async findByName(name: string) {
    const property = this.properties.find(
      (property) => property.name.toLowerCase() === name.toLowerCase(),
    )
    if (!property) {
      return null
    }
    return property
  }

  async findMany(query: QueriesProperty, page: number) {
    const { name } = query
    if (name) {
      return this.properties
        .filter((item) => item.name.includes(name))
        .slice((page - 1) * 20, page * 20)
    }

    return this.properties.slice((page - 1) * 20, page * 20)
  }

  async create(data: CreateProperty) {
    const { name, address, builder_id } = data

    const property = {
      id: randomUUID(),
      name,
      address: JSON.stringify(address),
      builder_id
    } as Property

    this.properties.push(property)

    return property
  }

  async update(id: string, data: Prisma.PropertyUncheckedUpdateInput) {
    const propertyIndex = this.properties.findIndex((item) => item.id === id)
    const property = this.properties[propertyIndex]
    const updateProperty = {
      ...property,
      ...data,
    } as Property

    this.properties[propertyIndex] = updateProperty

    return updateProperty
  }

  async delete(id: string) {
    const propertyIndex = this.properties.findIndex((item) => item.id === id)
    const property = this.properties[propertyIndex]
    const updateProperty = {
      ...property,
      active: false,
    } as Property

    this.properties[propertyIndex] = updateProperty

    return updateProperty
  }
}
