import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme, MenuProps, Menu } from 'antd';
import { getMenuListService } from '../api/menuApi';
import IconFont from '@/components/IconFont/IconFont';
import './BasicLayout.scss';
import { Outlet } from 'react-router-dom';
import MenuTree from '@/components/MenuTree/MenuTree';
import GloablLoading from '@/components/GlobalLoading';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/global/user';
import { menus } from './mockMenu';

const { Header, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser, setCurrentUser } = useUserStore();
  const { access_token, lang, refresh_token } = useGlobalStore();

  const [menuList, setMenuList] = useState<any[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getMenuList();
  }, []);

  const items: MenuItem[] = generateTree(menuList);
  const getMenuList = async () => {
    // const res = await getMenuListService({});
    // console.log(res, 'res');

    // if (res && res.statusCode !== 200) return;
    // setMenuList(res.data);
    setMenuList(menus);
  };

  /** 格式化菜单路由 */
  // const formatMenus = (menus: any[], menuGroup: Record<string, MenuItem[]) => {

  // };
  function generateTree(dataList: any[], parentId = 0) {
    const children: any = dataList
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        label: item.menuName,
        key: item.menuId,
        children: generateTree(dataList, item.menuId),
      }));

    return children.length > 0 ? children : null;
  }

  // if (loading || !currentUser) {
  //   return <GloablLoading />;
  // }

  return (
    <Layout hasSider className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <MenuTree menuItems={items} collapsed={collapsed} />
      </Sider>
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
