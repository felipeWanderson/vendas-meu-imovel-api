export class MissingPayDateActError extends Error {
  constructor() {
    super('pay_date_act is required for validation if not already set')
    this.name = 'MissingPayDateActError'
  }
}