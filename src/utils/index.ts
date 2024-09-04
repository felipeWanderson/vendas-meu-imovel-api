import { PayloadCreateSale } from "@/http/controllers/sales/create-sale-new";
import { PayloadCreateUsedSale } from "@/http/controllers/sales/create-sale-used";
import { Sale } from "@prisma/client";
import { format, parseISO } from "date-fns";

export function convertToCents(value: number): number {
  if (typeof value !== 'number') {
    throw new Error("O valor deve ser um número");
  }
  return Math.round(value * 100);
}

export const serializeSale = (sale: Sale) => {
  return {
    ...sale,
    act: String(sale.act),
    amount: String(sale.amount),
  }
}

export const formatPrismaPayloadCreateSale = (payload: PayloadCreateSale | PayloadCreateUsedSale) => {
  return {
    ...payload,
    date_sale: format(parseISO(payload.date_sale), "yyyy-MM-dd'T'HH:mm:ssXXX"),
    pay_date_act: payload.pay_date_act ? format(parseISO(String(payload.pay_date_act)), "yyyy-MM-dd'T'HH:mm:ssXXX") : undefined,
    act: convertToCents(payload.act),
    amount: convertToCents(payload.amount),
  }
}