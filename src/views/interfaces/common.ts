export interface IResponseProps {
  cmd: string;
  data: Record<string, any>;
  message: string;
  statusCode: number;
}
