import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBasicLoginProps, loginService } from '../../api/userApi';
import './Login.scss';
import { Button, Checkbox, Form, Input, Menu, MenuProps, message } from 'antd';
import IconFont from '@/components/IconFont/IconFont';
import { encryptedText } from '@/utils/constant';

interface ErrorInfo {
  values: unknown;
}

export default function Login() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('username');
  const onFinish = async (values: IBasicLoginProps) => {
    const { userPassword } = values;
    let result = null;
    // 加密 密码
    const encryptUserPassword = encryptedText(userPassword);
    if (values.agree) {
      // 记住密
      switch (current) {
        case 'username':
          // 加密 用户名
          result =
            values.userName &&
            (await loginService({
              userName: encryptedText(values.userName),
              userPassword: encryptUserPassword,
            }));
          break;
        case 'phone':
          // 加密 手机号
          result =
            values.telPhone &&
            (await loginService({
              telPhone: encryptedText(values.telPhone),
              userPassword: encryptUserPassword,
            }));
          break;
        case 'email':
          // 加密 邮箱
          result =
            values.email &&
            (await loginService({
              email: encryptedText(values.email),
              userPassword: encryptUserPassword,
            }));
          break;
        default:
          break;
      }
    }
    if (result) {
      const { statusCode, message: msg, data } = result;
      if (statusCode === 200 || statusCode === 201) {
        localStorage.setItem('access_token', data.access_token);
        message.success(msg);

        navigate('/layout');
      } else {
        message.error('登录失败');
      }
    }
  };

  const onFinishFailed = (errorInfo: ErrorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const items: MenuProps['items'] = [
    {
      label: '用户名',
      key: 'username',
      icon: <IconFont name="yonghu" />,
    },
    {
      label: '手机号',
      key: 'phone',
      icon: <IconFont name="shoujihao" />,
    },
    {
      label: '邮箱',
      key: 'email',
      icon: <IconFont name="youxiang" />,
    },
  ];

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  return (
    <div className="login-container">
      <div className="content">
        <h2 className="title mb-0">美丽屋管理系统</h2>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          theme="dark"
          items={items}
          className="login-menu mb-4"
        />
        <div className="px-4">
          <Form
            className="mx-2"
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {current === 'email' && (
              <Form.Item
                name="email"
                rules={[{ required: true, message: '请输入邮箱' }]}
              >
                <Input placeholder="邮箱" />
              </Form.Item>
            )}
            {current === 'username' && (
              <Form.Item
                name="userName"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="用户名" />
              </Form.Item>
            )}
            {current === 'phone' && (
              <Form.Item
                name="phone"
                rules={[{ required: true, message: '请输入手机号' }]}
              >
                <Input placeholder="手机号" />
              </Form.Item>
            )}
            <Form.Item
              name="userPassword"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>

            <Form.Item name="agree" valuePropName="checked">
              <Checkbox>我同意《登录》</Checkbox>
            </Form.Item>
            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
