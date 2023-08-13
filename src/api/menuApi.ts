import { ICreateMenuForm } from '@/interfaces/menu-list';
import { IResponseProps } from '../interfaces/common';
import request from '../utils/request';

export interface ILoginProps {
  userName: string;
  userPassword: string;
}

export interface IMenuItemResopnse {
  id: number;
  menuName: string;
  routeName: string;
  routePath: string;
  filePath: string;
  icon: string;
  parentId: number;
  createdAt: Date;
  updatedAt: Date;
  isModifiable: number;
  order: number;
}
export interface MenuItem extends IMenuItemResopnse {
  children?: MenuItem[];
  parentPaths?: string[];
  Component?: any;
  show?: boolean;
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
    request.post<{ data: IMenuItemResopnse[]; total: number }>(
      '/menu-list/search',
      data,
    ),
  getParents: (data: any) =>
    request.get<{ id: number; name: string }[]>('/menu-parents', data),
  createMenu: (data: ICreateMenuForm) => {
    return request.post<any>('/menu-list/create', data);
  },
};

export default menuListServer;
