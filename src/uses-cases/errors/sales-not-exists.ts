export class SaleNotExistsError extends Error {
  constructor() {
    super('Sale not exists.')
  }
}
