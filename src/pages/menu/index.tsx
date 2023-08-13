import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CreateMenuForm from './create-menu';
import menuListServer from '@/api/menuApi';
import dayjs from 'dayjs';

const MenuPage: React.FC = () => {
  const [createMenuModalVisible, setCreateMenuModalVisible] = useState(false);
  const [menuList, setMenuList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const menuListColumns: ColumnsType<any> = [
    {
      title: '菜单id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '路由名称',
      dataIndex: 'routeName',
      key: 'routeName',
    },
    {
      title: '路由路径',
      dataIndex: 'routePath',
      key: 'routePath',
    },
    {
      title: '组件路径',
      dataIndex: 'filePath',
      key: 'filePath',
    },
    {
      title: '路由图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '父级id',
      dataIndex: 'parentId',
      key: 'parentId',
    },
    {
      title: '角色权限',
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '路由创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => {
        const time = dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        return <div>{time}</div>;
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => {
        const time = dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        return <div>{text ? time : ''}</div>;
      },
    },
    {
      title: '是否可修改',
      dataIndex: 'isModifiable',
      key: 'isModifiable',
    },
  ];

  const showCreateMenuModal = () => {
    setCreateMenuModalVisible(true);
  };
  const saveMenu = () => {
    setCreateMenuModalVisible(false);
  };
  const cancelCreate = () => {
    setCreateMenuModalVisible(false);
  };
  const getMenuList = async () => {
    const [error, res] = await menuListServer.getMenuList({
      page: 1,
      pageSize: 10,
    });
    if (!error) {
      if (res.data) {
        setMenuList(res.data.data);
        setTotal(res.data.total);
      }
    }
  };
  useEffect(() => {
    getMenuList();
  }, []);
  return (
    <div>
      <div>
        <span>菜单管理</span>
        <Button onClick={() => showCreateMenuModal()}>添加菜单</Button>
      </div>
      <Table bordered columns={menuListColumns} dataSource={menuList} />
      <CreateMenuForm
        onSave={saveMenu}
        onCancel={cancelCreate}
        visible={createMenuModalVisible}
      />
    </div>
  );
};

export default MenuPage;
