export class InvalidSaleStatusError extends Error {
  constructor(currentStatus: string) {
    super(`Sale cannot be validated. Current status is ${currentStatus}`)
    this.name = 'InvalidSaleStatusError'
  }
}