import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './Layout.scss';
import { getMenuListService } from '../api/menuApi';
const { Header, Sider, Content } = Layout;

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState<any[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    getMenuList();
  }, []);
  const getMenuList = async () => {
    const res = await getMenuListService({});
    console.log(res, 'res');

    // setMenuList(res);
  };
  return (
    <Layout className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined rev={null} />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined rev={null} />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined rev={null} />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined rev={null} /> : <MenuFoldOutlined rev={null} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
