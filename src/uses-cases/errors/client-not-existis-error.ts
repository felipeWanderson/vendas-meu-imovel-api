export class ClientNotExistsError extends Error {
  constructor() {
    super('Client not exists.')
  }
}