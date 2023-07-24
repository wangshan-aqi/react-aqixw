import { IResponseProps } from '../interfaces/common';
import axios from '../utils/request';

export interface ILoginProps {
  userName: string;
  userPassword: string;
}

/** 菜单列表 */
export const getMenuListService = async (data: unknown) => {
  const result = await axios.get<IResponseProps>('/menu-list', data);
  return result;
};
