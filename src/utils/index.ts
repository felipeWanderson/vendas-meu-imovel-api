export function convertToCents(value: number): number {
  if (typeof value !== 'number') {
    throw new Error("O valor deve ser um número");
  }
  return Math.round(value * 100);
}