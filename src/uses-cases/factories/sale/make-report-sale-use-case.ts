import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { ReportSaleUseCase } from '@/uses-cases/report-sale'

export function makeReportSalesUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const reportSalesUseCase = new ReportSaleUseCase(salesRepository)

  return reportSalesUseCase
}
