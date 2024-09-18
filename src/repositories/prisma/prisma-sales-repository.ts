import { prisma } from "@/lib/prisma";
import { CreateSaleInput, QueriesSales, SalesRepository } from "../sales-repository";
import { Prisma, UserSaleRole } from "@prisma/client";

export class PrismaSalesRepository implements SalesRepository {
  async findAll(query: QueriesSales){
    const { status, id, client, seller, pickup, manager, property } = query;
    const whereClause: { [key: string]: any } = {};
    const whereClientClause: { [key: string]: any } = {};
    const wherePropertyClause: { [key: string]: any } = {};
    const whereManagerClause: { [key: string]: any } = {};
    const whereRealtorClauses: any[] = [];
  
    // Filtro por status da venda
    if (status) {
      whereClause.status = status;
    }
  
    // Filtro por ID da venda
    if (id) {
      whereClause.id = id;
    }
  
    // Filtro por nome do cliente
    if (client) {
      whereClientClause.name = {
        contains: client,
        mode: 'insensitive'
      };
    }
  
    // Filtro por nome da propriedade
    if (property) {
      wherePropertyClause.name = {
        contains: property,
        mode: 'insensitive'
      };
    }
  
    // Filtro por ID do corretor com a role "SELLER"
    if (seller) {
      whereRealtorClauses.push({
        user_id: seller,
        role: "SELLER"
      });
    }
  
    // Filtro por ID do corretor com a role "PICKUP"
    if (pickup) {
      whereRealtorClauses.push({
        user_id: pickup,
        role: "PICKUP"
      });
    }
  
    // Filtro por ID do gerente com a role "MANAGER"
    if (manager) {
      whereManagerClause.some = {
        user_id: manager,
        role: "MANAGER"
      };
    }
  
    // Construção da condição para o corretor (vendedor e pickup)
    const realtorCondition = whereRealtorClauses.length > 0 ? {
      users: {
        some: {
          OR: whereRealtorClauses
        }
      }
    } : {};
  
    // Contagem total de vendas com os filtros aplicados
    const countSales = await prisma.sale.count({
      where: {
        AND: [
          whereClause,
          {
            clients: {
              some: whereClientClause,
            },
          },
          {
            plant_property: {
              ...wherePropertyClause
            }
          },
          realtorCondition,
          {
            users: whereManagerClause
          }
        ]
      },
    });

  
    // Busca das vendas com os filtros e paginação aplicados
    const sales = await prisma.sale.findMany({
      where: {
        AND: [
          whereClause,
          {
            clients: {
              some: whereClientClause,
            },
          },
          {
            plant_property: {
              ...wherePropertyClause
            }
          },
          realtorCondition,
          {
            users: whereManagerClause
          }
        ]
      },
      include: {
        clients: {
          include: {
            Client: true
          }
        },
        users: {
          include: {
            User: {
              select: {
                id: true,
                first_name: true,
                last_name: true
              }
            }
          }
        },
        plant_property: { 
          include: {
            builder: true
          }
        }
      },
      orderBy: {
        date_sale: "desc"
      }
    });
  
    return { sales, total: countSales};
  }
  
async findById(id: string) {
    const sale = await prisma.sale.findUnique({
      where: {
        id
      },
      include: {
        clients: {
          include: {
            Client: true
          }
        },
        users: {
          include: {
            User: true
          }
        },
        plant_property: true
      }
      
    })

    return sale
  }

  async findMany(query: QueriesSales, page: number, perPage: number) {
    const { status, id, client, seller, pickup, manager, property } = query;
    const whereClause: { [key: string]: any } = {};
    const whereClientClause: { [key: string]: any } = {};
    const wherePropertyClause: { [key: string]: any } = {};
    const whereManagerClause: { [key: string]: any } = {};
    const whereRealtorClauses: any[] = [];
  
    // Filtro por status da venda
    if (status) {
      whereClause.status = status;
    }
  
    // Filtro por ID da venda
    if (id) {
      whereClause.id = id;
    }
  
    // Filtro por nome do cliente
    if (client) {
      whereClientClause.name = {
        contains: client,
        mode: 'insensitive'
      };
    }
  
    // Filtro por nome da propriedade
    if (property) {
      wherePropertyClause.name = {
        contains: property,
        mode: 'insensitive'
      };
    }
  
    // Filtro por ID do corretor com a role "SELLER"
    if (seller) {
      whereRealtorClauses.push({
        user_id: seller,
        role: "SELLER"
      });
    }
  
    // Filtro por ID do corretor com a role "PICKUP"
    if (pickup) {
      whereRealtorClauses.push({
        user_id: pickup,
        role: "PICKUP"
      });
    }
  
    // Filtro por ID do gerente com a role "MANAGER"
    if (manager) {
      whereManagerClause.some = {
        user_id: manager,
        role: "MANAGER"
      };
    }
  
    // Construção da condição para o corretor (vendedor e pickup)
    const realtorCondition = whereRealtorClauses.length > 0 ? {
      users: {
        some: {
          OR: whereRealtorClauses
        }
      }
    } : {};
  
    // Contagem total de vendas com os filtros aplicados
    const countSales = await prisma.sale.count({
      where: {
        AND: [
          whereClause,
          {
            clients: {
              some: whereClientClause,
            },
          },
          {
            plant_property: {
              ...wherePropertyClause
            }
          },
          realtorCondition,
          {
            users: whereManagerClause
          }
        ]
      },
    });
  
    // Calculando o offset para a paginação
    const offset = (page - 1) * perPage;
  
    // Busca das vendas com os filtros e paginação aplicados
    const sales = await prisma.sale.findMany({
      where: {
        AND: [
          whereClause,
          {
            clients: {
              some: whereClientClause,
            },
          },
          {
            plant_property: {
              ...wherePropertyClause
            }
          },
          realtorCondition,
          {
            users: whereManagerClause
          }
        ]
      },
      include: {
        clients: {
          include: {
            Client: true
          }
        },
        users: {
          include: {
            User: {
              select: {
                id: true,
                first_name: true,
                last_name: true
              }
            }
          }
        },
        plant_property: { 
          include: {
            builder: true
          }
        }
      },
      take: perPage,
      skip: offset,
      orderBy: {
        date_sale: "desc"
      }
    });
  
    return { sales, total: countSales, limit: perPage, offset };
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
  async delete(id: string, fall_motive: string) {
    const sale = await prisma.sale.update({
      where: {
        id,
      },
      data: {
        status: "FAILED",
        fall_motive
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