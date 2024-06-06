import { prisma } from "@/lib/prisma";
import { CreateSaleInput, Sale, SalesRepository } from "../sales-repository";

export class PrismaSalesRepository implements SalesRepository {
  async create(data: CreateSaleInput) {
    const sale = await prisma.sale.create({
      data
    })

    return sale
  }

}