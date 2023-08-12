import { ICreateMenuForm } from '@/interfaces/menu-list';
import { IResponseProps } from '../interfaces/common';
import request from '../utils/request';

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
// export const getMenuListService = async (data: any) => {
//   const result = await axios.get<MenuItem[]>('/menu-list', data);
//   return result;
// };
// export const getMenuListService = async (data: any) => {
//   const result = await axios.get<MenuItem[]>('/menu-list/menu-parents', data);
//   return result;
// };

const menuListServer = {
  getMenuList: (data: any) =>
    request.post<MenuItem[]>('/menu-list/search', data),
  getParents: (data: any) =>
    request.get<{ id: number; name: string }[]>('/menu-parents', data),
  createMenu: (data: ICreateMenuForm) => {
    return request.post<any>('/menu-list', data);
  },
};

export default menuListServer;
