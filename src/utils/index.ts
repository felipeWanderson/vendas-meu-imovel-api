import { ptBRStatusSale } from "@/constants";
import { PayloadCreateSale } from "@/http/controllers/sales/create-sale-new";
import { PayloadCreateUsedSale } from "@/http/controllers/sales/create-sale-used";
import { Sale } from "@/repositories/sales-repository";
import { format, parseISO } from "date-fns";
import { ptBR } from 'date-fns/locale';


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

export const formtCollumReportSale = (sale: Sale) => {
  return {
    id: sale.id,
    status: ptBRStatusSale[sale.status],
    realtor: sale.users?.find(user => user.role === 'SELLER')?.User?.first_name || '',
    manager: sale.users?.find(user => user.role === 'MANAGER')?.User?.first_name || '',
    client_buyer: sale?.clients?.find(client => client.role === 'BUYER')?.Client?.name || '',
    client_document: sale?.clients?.find(client => client.role === 'BUYER')?.Client?.document || '',
    month: format(sale.date_sale, 'MMM', { locale: ptBR }).toUpperCase(),
    date_sale: format(sale.date_sale, "dd/MM/yyyy"),
    property: sale?.single_property ? sale?.single_property : sale?.plant_property?.name || '',
    builder: sale?.plant_property?.builder?.name || '',
    unity: sale.unity,
    pickup: sale?.users?.find(user => user.role === 'PICKUP')?.User?.first_name || '',
    amount: new Intl.NumberFormat('pt-BR', { 
      style: 'currency', currency: 'BRL' }).format(Number(sale.amount) / 100),
    act:  new Intl.NumberFormat('pt-BR', { 
      style: 'currency', currency: 'BRL' }).format(Number(sale.act,) / 100),
    negotiation: JSON.stringify(sale.negotiation) || '',
    fall_motive: sale.fall_motive
  }
}