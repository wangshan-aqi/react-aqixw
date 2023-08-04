export interface IResponseProps<T> {
  cmd: string;
  data: T;
  message: string;
  statusCode: number;
}
