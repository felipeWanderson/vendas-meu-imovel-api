export class BuilderNotExistsError extends Error {
  constructor() {
    super('Builder not exists.')
  }
}
