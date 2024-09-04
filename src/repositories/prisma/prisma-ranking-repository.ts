import { prisma } from "@/lib/prisma";
import { RankingRepository,UserWithSales } from "../ranking-repository";
import { StatusSale } from "@prisma/client";

export class PrismaRankingRepository implements RankingRepository {
  async getSalesByMonthAndYear(startDate: Date, endDate: Date): Promise<UserWithSales[]> {
    const usersAndSales = await prisma.user.findMany({
      where: {
        roles: {
          has: 'REALTOR',
        },
        is_ranking: true,
        active: true,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        is_ranking: true,
        avatar_url: true,
        sales: {
          where: {
            role: "SELLER",
            sale: {
              status: {
                in: [StatusSale.VALIDATED, StatusSale.PROCESSING, StatusSale.CONCLUDED],
              },
              date_sale: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
          select: {
            sale: {
              select: {
                amount: true,
              }
            }
          }
        }
      },
    });

  return usersAndSales;
  }
}