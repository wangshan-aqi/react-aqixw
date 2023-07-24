// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginProps, loginService } from '../api/userApi';
import './Login.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import { encryptedText } from '../utils/constant';
import { message } from 'antd';

interface ErrorInfo {
  values: unknown;
}

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: ILoginProps) => {
    const { userName, userPassword } = values;

    // 加密 用户名
    const encryptUserName = encryptedText(userName);
    // 加密 密码
    const encryptUserPassword = encryptedText(userPassword);

    const result = await loginService({
      userName: encryptUserName,
      userPassword: encryptUserPassword,
    });

    const { statusCode, message: msg, data } = result;
    if (statusCode === 200 || statusCode === 201) {
      sessionStorage.setItem('access_token', data.access_token);
      message.success(msg);

      navigate('/layout');
    } else {
      message.error('登录失败');
    }
  };

  const onFinishFailed = (errorInfo: ErrorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="content">
        <h2 className="title">美丽屋管理系统</h2>
        <Form
          className="mx-2"
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input addonBefore={selectBefore} />
          </Form.Item>

          <Form.Item name="userPassword" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>我同意《登录》</Checkbox>
          </Form.Item>
          <div className="flex flex-col">
            <div className="text-center">
              <span>其他登录方式</span>
            </div>
            <div className="flex justify-between">
              <Button type="link">邮箱</Button>
              <Button type="link">手机号</Button>
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
