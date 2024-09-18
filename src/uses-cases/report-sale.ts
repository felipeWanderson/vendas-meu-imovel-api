import { SalesRepository, QueriesSales } from '@/repositories/sales-repository'
import { formtCollumReportSale } from '@/utils';
import { Sale } from '@prisma/client'
import ExcelJS from 'exceljs';


interface ReportSalesUseCaseRequest {
  query: QueriesSales
}

interface ReportSalesUseCaseResponse {
  sales: Sale[];
  total: number
}

export class ReportSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({
    query
  }: ReportSalesUseCaseRequest): Promise<ExcelJS.Buffer> {
    const {sales, total} = await this.salesRepository.findAll(query)

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`vendas`);
    
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'STATUS', key: 'status', width: 30 },
      { header: 'CORRETOR', key: 'realtor', width: 30 },
      { header: 'GERENTE', key: 'manager', width: 30 },
      { header: 'CLIENTE', key: 'client_buyer', width: 30 },
      { header: 'CPF', key: 'client_document', width: 30 },
      { header: 'MÊS', key: 'month', width: 30 },
      { header: 'DT VENDA', key: 'date_sale', width: 30 },
      { header: 'IMÓVEL', key: 'property', width: 30 },
      { header: 'CONSTRUTORA', key: 'builder', width: 30 },
      { header: 'UNIDADE', key: 'unity', width: 30 },
      { header: 'CAPTADOR', key: 'pickup', width: 30 },
      { header: 'VGV', key: 'amount', width: 30 },
      { header: 'VALOR DO ATO', key: 'act', width: 30 },
      { header: 'OBSERVAÇÃO', key: 'negotiation', width: 30 },
      { header: 'MOTIVO DE CANCELAMENTO', key: 'fall_motive', width: 30 },
    ]

    sales.forEach(sale => {
      worksheet.addRow(formtCollumReportSale(sale));
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
