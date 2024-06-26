export interface APIResponseType<T = any> {
  success?: boolean;
  code?: number;
  msg?: string;
  data?: T;
}
