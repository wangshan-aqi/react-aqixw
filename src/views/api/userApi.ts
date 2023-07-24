import { IResponseProps } from '../interfaces/common';
import axios from '../utils/request';

export interface ILoginProps {
  userName: string;
  userPassword: string;
}

// 登录
export const loginService = async (data: unknown) => {
  const result = await axios.post<IResponseProps>('/auth/userNameLogin', data);
  return result;
};
