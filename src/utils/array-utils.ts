// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatArray<T = any>(param: any): Array<T> {
  return Array.isArray(param) ? param : [];
}
