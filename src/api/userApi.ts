// import { IResponseProps } from '../interfaces/common';
import axios from '../utils/request';

export interface IBasicLoginProps {
  userPassword: string;
  agree: boolean;
}
export interface IUserNameLoginProps extends IBasicLoginProps {
  userName: string;
}
export interface ITelPhoneLoginProps extends IBasicLoginProps {
  telPhone: string;
}
export interface IEmailLoginProps extends IBasicLoginProps {
  email: string;
}
export interface IUserResponseProps {
  userId: number;
  userName: string;
  access_token: string; // 生成token
  refresh_token: string; // 生成RefreshToken
}

// 登录
export const loginService = async (data: IUserNameLoginProps) => {
  const result = await axios.post<IUserResponseProps>(
    '/auth/userNameLogin',
    data,
  );
  return result;
};
