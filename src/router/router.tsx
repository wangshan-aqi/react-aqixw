/**
 * @file This file exports a router component that uses react-router-dom to handle routing in the application.
 * @module router
 */

import React, { lazy, useEffect } from 'react';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { App, Menu } from 'antd';
import MenuPage from '@/pages/menu';
import UserPage from '@/pages/user';
import UserRolePage from '@/pages/user-role';

// 懒加载组件
const Login = lazy(() => import('../pages/login/login'));

const ResetPassword = lazy(
  () => import('../pages/login/reset-password/reset-password'),
);

const BasicLayout = lazy(() => import('../layouts/basicLayout'));

/**
 * 定义应用程序的路由对象
 * @type {Object[]}
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/resetPassword',
    Component: ResetPassword,
  },
  {
    path: '*',
    Component: BasicLayout,
    children: [
      {
        path: '*/menu-page',
        Component: MenuPage,
      },
    ],
  },
  {
    path: '/404',
    Component: () => <div>404</div>,
  },
]);

/**
 * 根据路径查找路由对象中的节点的帮助函数
 * @param {Object[]} routes - 要搜索的路由
 * @param {string} path - 要搜索的路径
 * @returns {Object|undefined} 匹配路径的节点，如果未找到则返回undefined
 */
function findNodeByPath(routes: RouteObject[], path: string) {
  for (let i = 0; i < routes.length; i++) {
    const element = routes[i];

    if (element.path === path) {
      return element;
    }
    findNodeByPath(element.children || [], path);
  }
}

/**
 * 将路由添加到路由对象的帮助函数
 * @param {string} parentPath - 要添加路由的父节点的路径
 * @param {Object[]} routes - 要添加的路由
 */
export const addRoutes = (parentPath: string, routes: RouteObject[]) => {
  if (!parentPath) {
    router.routes.push(...(routes as any));
    return;
  }
  const curNode = findNodeByPath(router.routes, parentPath);
  // 如果找到了父节点，则将路由添加到父节点的子节点中， 否则将路由添加到根节点中
  if (curNode?.children) {
    curNode.children.push(...routes);
  } else if (curNode) {
    curNode.children = routes;
  }
};
/**
 * 将路由替换到路由对象的帮助函数
 * @param {string} parentPath - 要替换路由的父节点的路径
 * @param {Object[]} routes - 要替换的路由
 * @returns {Object|undefined} 匹配路径的节点，如果未找到则返回undefined
 * */
export const replaceRoutes = (parentPath: string, routes: RouteObject[]) => {
  if (!parentPath) {
    router.routes.push(...(routes as any));
    return;
  }
  // 如果找到了父节点，则将路由替换到父节点的子节点中， 否则将路由替换到根节点中
  const curNode = findNodeByPath(router.routes, parentPath);
  if (curNode) {
    curNode.children = routes;
  }
};

/**
 * 渲染RouterProvider的主要路由组件
 * @returns {JSX.Element} 路由组件
 */
const Router = () => {
  //   const { notification, message, modal } = App.useApp();

  //   useEffect(() => {
  //     antdUtils.setMessageInstance(message);
  //     antdUtils.setNotificationInstance(notification);
  //     antdUtils.setModalInstance(modal);
  //   }, [notification, message, modal]);

  return <RouterProvider router={router} />;
};

export default Router;
