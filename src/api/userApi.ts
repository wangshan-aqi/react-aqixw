import { IResponseProps } from '../interfaces/common';
import axios from '../utils/request';

export interface IBasicLoginProps {
  userName?: string;
  telPhone?: string;
  email?: string;
  userPassword: string;
  agree?: boolean;
}

// 登录
export const loginService = async (data: IBasicLoginProps) => {
  const result = await axios.post<IResponseProps>('/auth/userNameLogin', data);
  return result;
};
