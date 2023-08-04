import { IResponseProps } from '../interfaces/common';
import axios from '../utils/request';

export interface ILoginProps {
  userName: string;
  userPassword: string;
}

export interface MenuItem {
  menuId: number;
  menuName: string;
  routeName: string;
  routePath: string;
  componentPath: string;
  routeIcon: string;
  parentId: number;
  rolePermissions: string;
  buttonPermissions: string;
  isDelete: IsDelete;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  canModify: number;
}

export enum IsDelete {
  DELETE = 0,
  NODELETE = 1,
}
export enum CanModify {
  MODIFY = 0,
  NOMODIFY = 1,
}
/** 菜单列表 */
export const getMenuListService = async (data: unknown) => {
  // const result = await axios.get<IResponseProps>("/menu-list", data);
  // return result;
};
