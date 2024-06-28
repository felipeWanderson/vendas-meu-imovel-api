import { Client, Prisma } from "@prisma/client";

export interface QueriesClients {
  id?: string;
  name?: string;
  document?: string;
  active?: boolean;
}

export interface ClientsRepository {
  findById(id: string): Promise<Client | null>;
  findByDocument(document: string): Promise<Client | null>;
  findMany(query: QueriesClients, page: number): Promise<Client[]>;
  create(data: Prisma.ClientCreateInput): Promise<Client>;
  update(id: string, data: Prisma.ClientUpdateInput): Promise<Client>;
  delete(id: string): Promise<Client>;
}