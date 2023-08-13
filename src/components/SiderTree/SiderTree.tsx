// import { Menu } from 'antd';
import { Link, useMatches } from 'react-router-dom';
import IconFont from '../IconFont/IconFont';
import './SiderTree.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGlobalStore } from '@/stores/global';
import { MenuItem as MenuItemType } from '@/api/menuApi';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Menu } from 'antd';

const SiderTree = (props: any) => {
  const matches = useMatches(); // 获取当前路由
  const [openKeys, setOpenKeys] = useState<string[]>([]); // 当前展开的 SubMenu 菜单项 key 数组
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // 当前选中的菜单项 key 数组

  const { collapsed } = useGlobalStore(); // 获取全局状态 collapsed 侧边栏是否收起

  // const
  useEffect(() => {
    if (collapsed) {
      setOpenKeys([]); // 侧边栏收起时，清空展开的菜单项
    } else {
      const [match] = matches || []; // 获取当前路由
      if (match) {
        // 获取当前匹配的路由，默认为第一个
        // const route = matches.at(0);
        // 获取当前匹配的路由，默认为最后一个
        const route = matches.at(-1);
        // 从匹配的路由中取出自定义的参数
        const handle = route?.handle as any;
        setOpenKeys(handle?.openKeys || []); // 设置展开的菜单项
        setSelectedKeys(
          [...(handle?.parentPaths || []), handle?.routePath] || [],
        ); // 设置选中的菜单项
      }
    }
  }, [
    matches, // 当前路由
    collapsed, // 侧边栏是否收起
  ]); // 当前路由变化时 或 侧边栏收起变化时，执行 useEffect 回调

  // 获取菜单标题
  const getMenuTitle = (menu: MenuItemType) => {
    if (menu?.children?.filter(menu => menu.show)?.length) {
      return menu.menuName;
    }
    return <Link to={menu.routePath}>{menu.menuName}</Link>;
  };

  const treeMenuData = useCallback((menuList: MenuItemType[]): ItemType[] => {
    return menuList.map(menu => {
      const children = menu?.children?.filter(menu => menu.show) || [];

      return {
        key: menu.routePath,
        label: getMenuTitle(menu),
        icon: menu.icon && <IconFont name={menu.icon} />,
        children: children.length ? treeMenuData(children || []) : null,
      };
    });
  }, []);

  const menuData = useMemo(() => {
    const data = treeMenuData(
      props.menuList?.filter((menu: any) => menu) || [],
    );
    return data;
  }, [props.menuList]);

  return (
    <Menu
      className="bg-primary color-transition"
      mode="inline"
      selectedKeys={selectedKeys}
      style={{ height: '100%', borderRight: 0 }}
      items={menuData}
      inlineCollapsed={collapsed}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
    />
  );
};

export default SiderTree;
