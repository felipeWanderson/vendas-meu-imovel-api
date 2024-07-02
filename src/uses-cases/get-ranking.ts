import { RankingRepository } from '@/repositories/ranking-repository';
import { SalesRepository } from '@/repositories/sales-repository';
import { startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

interface GetRankingParams {
  month?: number;
  year?: number;
}

interface Ranking {
  position: string;
  name: string;
  vgv: number;
  vgvFormatted: string;
}

export class GetRanking {
  constructor(private rankingRepository: RankingRepository) {}

  async execute({ month, year }: GetRankingParams): Promise<Ranking[]> {
    const currentYear = new Date().getFullYear();
    const selectedYear = year || currentYear;
    let startDate: Date;
    let endDate: Date;

    if (month) {
      startDate = startOfMonth(new Date(selectedYear, month - 1));
      endDate = endOfMonth(new Date(selectedYear, month - 1));
    } else {
      startDate = startOfYear(new Date(selectedYear, 0));
      endDate = endOfYear(new Date(selectedYear, 11));
    }

    const sales = await this.rankingRepository.getSalesByMonthAndYear(startDate, endDate);

    const formmatedSales = sales.map(user => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      is_ranking: user.is_ranking,
      amount:user?.sales?.reduce((acc, sale) => {
        const value = acc += Number(sale.sale.amount);
        return value;
      },0) / 100,
      amountFormatted: new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency'
      }).format(user?.sales?.reduce((acc, sale) => {
        const value = acc += Number(sale.sale.amount);
        return value;
      },0) / 100)
    })).sort((a, b) => b.amount - a.amount);

    const ranking = formmatedSales.map((user, index) => ({
      position: `${index + 1}°`,
      name: user.name,
      vgv: user.amount,
      vgvFormatted: user.amountFormatted
    }))

    return ranking;
  }
}
