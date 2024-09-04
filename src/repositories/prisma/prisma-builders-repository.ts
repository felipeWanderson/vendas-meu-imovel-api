import { Builder, Prisma } from "@prisma/client";
import { BuilderRepository, QueriesBuider } from "../builders-repository";
import { prisma } from "@/lib/prisma";

export class PrismaBuildersRepository  implements BuilderRepository {
  async findById(id: string) {
    const builder = await prisma.builder.findUnique({
      where: {
        id
      },
      include: {
        properties: true
      }

    })

    return builder
  }
  async findByDocument(document: string){
    const builder = await prisma.builder.findUnique({
      where: {
        document
      },
      include: {
        properties: true
      }
    })

    return builder
  }
  async findMany(query: QueriesBuider, page: number) {
    const { name, document, active } = query
    const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = {
      contains: name,
      mode: 'insensitive'
    };
  }

  if (document) {
    whereClause.document = document;
  }

  whereClause.active = active

  const builders = await prisma.builder.findMany({
    where: whereClause,
    include: {
      properties: true
    },
    take: 20,
    skip: (page - 1) * 20,
  })
    return builders;
  }
  async create(data: Prisma.BuilderCreateInput): Promise<{ id: string; name: string; document: string; active: boolean; }> {
    const builder = await prisma.builder.create({
      data,
    })

    return builder
  }
  async update(id: string, data: Prisma.BuilderUpdateInput){
    const builder = await prisma.builder.update({
      where: {
        id,
      },
      data,
    })

    return builder
  }
  async delete(id: string) {
    const builder = await prisma.builder.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    })

    return builder
  }
}