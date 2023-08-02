import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme, MenuProps, Menu } from 'antd';
import { getMenuListService } from '../api/menuApi';
import IconFont from '@/components/IconFont/IconFont';
import './BasicLayout.scss';
import { Outlet } from 'react-router-dom';
import MenuList from '@/components/MenuList/MenuList';

const { Header, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState<any[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getMenuList();
  }, []);

  const items: MenuItem[] = generateTree(menuList);
  const getMenuList = async () => {
    const res = await getMenuListService({});
    if (res && res.statusCode !== 200) return;
    setMenuList(res.data);
  };

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

  return (
    <Layout hasSider className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <MenuList menuItems={items} collapsed={collapsed} />
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
