import { Prisma } from "@prisma/client";
import { ClientsRepository, QueriesClients } from "../clients-repository";
import { prisma } from "@/lib/prisma";

export class PrismaClientsRepository  implements ClientsRepository {
  async findById(id: string) {
    return await prisma.client.findUnique({
      where: { id },
    });
  }
  async findByDocument(document: string) {
    return await prisma.client.findUnique({
      where: { document },
    });
  }
  async findMany(query: QueriesClients, page: number) {
    const { name, document, active = true, id } = query
    const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = {
      contains: name,
      mode: 'insensitive'
    };
  }
  if (id) {
    whereClause.id = id;
  }
  if (document) {
    whereClause.document = document;
  }

  whereClause.active = active

  const clients = await prisma.client.findMany({
    where: whereClause,
    take: 20,
    skip: (page - 1) * 20,
  })
    return clients;
  }
  async create(data: Prisma.ClientCreateInput) {
    return await prisma.client.create({
      data,
    });
  }
  async update(id: string, data: Prisma.ClientUpdateInput){
    return await prisma.client.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    return await prisma.client.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
}