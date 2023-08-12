import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CreateMenuForm from './create-menu';
import menuListServer from '@/api/menuApi';
// type MenuListColumnType = {
//   key: string;
//   id: string;
//   menuName: string;
//   routeName: string;
//   routePath: string;
//   filePath: string;
//   icon: string;
//   parentId: number;
//   roleCode: string;
//   createdAt: string;
//   updatedAt: string;
//   canModify: number;
// };
const MenuPage: React.FC = () => {
  const [createMenuModalVisible, setCreateMenuModalVisible] = useState(false);
  const [menuList, setmenuList] = useState<any[]>([]);

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
      title: '是否可删除',
      dataIndex: 'isDelete',
      key: 'isDelete',
    },
    {
      title: '路由创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '是否可修改',
      dataIndex: 'canModify',
      key: 'canModify',
    },
  ];

  const data: any[] = [
    {
      key: '1',
      id: '678345698247',
      menuName: '首页',
      routeName: '首页',
      routePath: '/home',
      filePath: 'src/views/home/index.tsx',
      icon: 'HomeOutlined',
      parentId: 0,
      roleCode: 'admin',
      createdAt: '2021-08-16T07:25:00.000Z',
      updatedAt: '2021-08-16T07:25:00.000Z',
      canModify: 0,
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
      if (res.data.length > 0) {
        setmenuList(res.data);
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
      {/* <Table columns={menuListColumns} dataSource={data} /> */}
      <CreateMenuForm
        onSave={saveMenu}
        onCancel={cancelCreate}
        visible={createMenuModalVisible}
      />
    </div>
  );
};

export default MenuPage;
