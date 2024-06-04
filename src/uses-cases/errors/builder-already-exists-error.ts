export class BuilderAlreadyExistsError extends Error {
  constructor() {
    super('Builder already exists.')
  }
}
