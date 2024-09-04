export type UserWithSales = {
  id: string;
  first_name: string;
  last_name: string;
  is_ranking: boolean;
  avatar_url: string | null;
  sales: {
      sale: {
          amount: bigint;
      };
  }[];
};

export interface RankingRepository {
  getSalesByMonthAndYear(startDate: Date, endDate: Date): Promise<UserWithSales[]>
}