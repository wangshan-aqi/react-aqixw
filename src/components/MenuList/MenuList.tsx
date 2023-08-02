import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import IconFont from '../IconFont/IconFont';
import './MenuList.scss';

interface IProps {
  menuItems: any[];
  collapsed: boolean;
}

const MenuList = (props: IProps) => {
  const { collapsed } = props;
  return (
    <ul className="mb-0">
      {props.menuItems &&
        props.menuItems.map(item => {
          return item.children ? (
            <li key={item.key} title={item.label}>
              {item.children.map((child: any) => {
                return (
                  <div className="flex items-center w-full h-10 justify-center hover:text-sky-700">
                    <IconFont
                      className="text-[16px] text-[#fff] mr-4"
                      name={child.routeIcon}
                    />

                    {collapsed ? (
                      <></>
                    ) : (
                      <Link
                        className={`text-[16px] text-[#fff] ${
                          !collapsed ? 'mr-4' : ''
                        }`}
                        key={child.key}
                        to={child.routePath}
                      >
                        {child.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </li>
          ) : (
            <li className="flex items-center w-full h-10 justify-center hover:text-sky-700">
              <IconFont
                className={`text-[16px] text-[#fff] ${
                  !collapsed ? 'mr-4' : ''
                }`}
                name={item.routeIcon}
              />

              {collapsed ? (
                <></>
              ) : (
                <Link
                  className="menu-link text-[16px] text-[#fff]"
                  key={item.key}
                  to={item.routePath}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default MenuList;
