import React, { lazy, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from 'antd';
const Login = lazy(() => import('../views/Login/Login'));
const ResetPassword = lazy(
  () => import('../views/Login/ResetPassword/reset-password'),
);
const BasicLayout = lazy(() => import('../Layouts/BasicLayout'));
export const router = createBrowserRouter([
  {
    path: '/user/login',
    Component: Login,
  },
  {
    path: '/user/resetPassword',
    Component: ResetPassword,
  },
  {
    path: '*',
    Component: BasicLayout,
    children: [],
  },
]);
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
