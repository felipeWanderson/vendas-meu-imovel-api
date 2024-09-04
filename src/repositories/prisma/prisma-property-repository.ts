import { Prisma } from "@prisma/client";
import { CreateProperty, PropertyRepository, QueriesProperty } from "../property-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPropertiesRepository  implements PropertyRepository {
  async findMany(query: QueriesProperty, page: number) {
    const { name, active } = query
    const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = {
      contains: name,
      mode: 'insensitive'
    };
  }

  whereClause.active = active

  const properties = await prisma.property.findMany({
    where: whereClause,
    take: 20,
    skip: (page - 1) * 20,
  })
    return properties;
  }
  async findById(id: string) {
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
      include: {
        builder: true
      }
    })

    return property
  }
  async findPropertyByBuilder(id: string) {
    const properties = await prisma.property.findMany({
      where: {
        builder_id: id
      }
    })

    return properties
  }
  async create(data: CreateProperty) {
   const builder = await prisma.property.create({
     data
   })

   return builder
  }
  async update(id: string, data: Prisma.PropertyUncheckedUpdateInput) {
    const property = await prisma.property.update({
      where: {
        id,
      },
      data,
    })

    return property
  }
  async delete(id: string) {
    const property = await prisma.property.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    })

    return property
  }
}