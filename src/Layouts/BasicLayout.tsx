import React, { lazy, useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme, MenuProps, Menu } from 'antd';
// import { getMenuListService } from '../api/menuApi';
// import IconFont from '@/components/IconFont/IconFont';
import './basicLayout.scss';
import { Outlet } from 'react-router-dom';
import MenuTree from '@/components/MenuTree/MenuTree';
import menuListServer, { IMenuItemResopnse, MenuItem } from '@/api/menuApi';
import SiderTree from '@/components/SiderTree/SiderTree';
import { replaceRoutes } from '@/router/router';
import Result404 from '@/404';
import { useGlobalStore } from '@/stores/global';
import GloablLoading from '@/components/GlobalLoading';
// import GloablLoading from '@/components/GlobalLoading';
// import { useGlobalStore } from '@/stores/global';
// import { useUserStore } from '@/stores/global/user';

const { Header, Sider, Content } = Layout;

const BasicLayout: React.FC = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const { collapsed, setCollapsed } = useGlobalStore();
  const [loading, setLoading] = useState(true);
  // const { currentUser, setCurrentUser } = useUserStore();
  // const { access_token, lang, refresh_token } = useGlobalStore();

  const [menuList, setMenuList] = useState<IMenuItemResopnse[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getMenuList();
  }, []);
  useEffect(() => {
    if (menuList.length) {
      const menuGroup = menuList.reduce<Record<string, MenuItem[]>>(
        (prev: any, menu: any) => {
          if (!menu.parentId) {
            return prev;
          }

          if (!prev[menu.parentId]) {
            prev[menu.parentId] = [];
          }

          prev[menu.parentId].push(menu);
          return prev;
        },
        {},
      );
      const routes: MenuItem[] = [];
      const arr = formatMenus(
        menuList.filter(menu => !menu.parentId),
        menuGroup,
        routes,
      );

      replaceRoutes('*', [
        ...routes.map(menu => {
          return {
            path: `/*${menu.routePath}`,
            Component: menu.filePath
              ? lazy(() => import(`@/pages${menu.filePath}`))
              : null,
            id: `/*${menu.routePath}`,
            handle: {
              parentPaths: menu.parentPaths,
              path: menu.routePath,
            },
          };
        }),
        {
          id: '*',
          path: '*',
          Component: Result404,
        },
      ]);
    }

    setLoading(false);
  }, [menuList]);

  const getMenuList = async () => {
    const [error, res] = await menuListServer.getMenuList({
      page: 1,
      pageSize: 999,
    });
    if (!error) {
      if (res.data) {
        setMenuList(res.data.data);
      }
    }
  };

  /** 格式化菜单路由 */
  const formatMenus = (
    menus: MenuItem[],
    menuGroup: Record<string, MenuItem[]>,
    routes: MenuItem[],
    parentMenu?: MenuItem,
  ): MenuItem[] => {
    return menus.map(menu => {
      const children = menuGroup[menu.id];
      const parentPaths = parentMenu?.parentPaths || [];
      const routePath =
        (parentMenu
          ? `${parentPaths.at(-1)}${menu.routePath}`
          : menu.routePath) || '';

      routes.push({
        ...menu,
        routePath,
        parentPaths,
      });
      return {
        ...menu,
        parentPaths,
        children: children
          ? formatMenus(children, menuGroup, routes, {
              ...menu,
              parentPaths: [...parentPaths, routePath || ''].filter(Boolean),
            })
          : [],
      };
    });
  };
  // loading
  if (loading) {
    return <GloablLoading />;
  }
  return (
    <Layout hasSider className="layout-container">
      {/* <Sider> */}
      <SiderTree menuList={menuList} />
      {/* </Sider> */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined rev={null} />
              ) : (
                <MenuFoldOutlined rev={null} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '16px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
