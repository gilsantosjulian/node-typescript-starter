export default interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: object;
  config: object;
  request?: object;
}
