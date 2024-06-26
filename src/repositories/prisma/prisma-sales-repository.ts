import { prisma } from "@/lib/prisma";
import { CreateSaleInput, QueriesSales, SalesRepository, UpdateSale } from "../sales-repository";
import { Prisma } from "@prisma/client";

export class PrismaSalesRepository implements SalesRepository {
  async findById(id: string) {
    const sale = await prisma.sale.findUnique({
      where: {
        id
      },
      include: {
        clients: true,
        users: true,
        plant_property: true
      }
      
    })

    return sale
  }

  async findMany(query: QueriesSales, page: number) {
    const { status, id, client, realtor, manager, property } = query
    const whereClause: { [key: string]: any } = {};
    const whereClientClause: { [key: string]: any } = {};
    const wherePropertyClause: { [key: string]: any } = {};
    const whereMangerClause: { [key: string]: any } = {};
    const whereRealtorClause: { [key: string]: any } = {};

  if (status) {
    whereClause.status = status;
  }

  if (id) {
    whereClause.id = id
  }

  if (client) {
    whereClientClause.name = {
      contains: client,
      mode: 'insensitive'
    };
  }
  if (property) {
    wherePropertyClause.name = {
      contains: property,
      mode: 'insensitive'
    };
  }

  if (realtor) {
    whereRealtorClause.id = realtor
  }

  if (manager) {
    whereMangerClause.id = manager
  }


  const sales = await prisma.sale.findMany({
    where: whereClause,
    include: {
      clients: {
        where: whereClientClause
      },
      users: true,
      plant_property: { 
        include: {
          builder: true
        },
        where: wherePropertyClause
      }
    },
    take: 20,
    skip: (page - 1) * 20,
  })
    return sales;
  }
  async update(id: string, data: Prisma.SaleUpdateInput){
    return prisma.sale.update({
      where: { id },
      data,
      include: {
        users: true,
        clients: true,
      },
    });
  }
  async delete(id: string) {
    const sale = await prisma.sale.update({
      where: {
        id,
      },
      data: {
        status: "FAILED"
      },
    })

    return sale
  }
  async create(data: CreateSaleInput) {
    const sale = await prisma.sale.create({
      data
    })

    return sale
  }

}