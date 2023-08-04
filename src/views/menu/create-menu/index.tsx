import IconFont from '@/components/IconFont/IconFont';
import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;

type CreateMenuFormProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: () => void;
};

const CreateMenuForm: React.FC<CreateMenuFormProps> = props => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    menuName: string;
    routeName: string;
    routePath: string;
    filePath: string;
    icon?: string;
    parentId: string;
    roleCode: string;
  };
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  //   const showCreateMenuModal = () => {
  //     setIsModalOpen(true);
  //   };

  //   const handleConfirmCreate = () => {
  //     setIsModalOpen(false);
  //   };

  //   const handleCancelCreate = () => {
  //     setIsModalOpen(false);
  //   };

  const parentIdOptions = [
    { label: '顶级目录', value: '0' },
    { label: '系统管理', value: '1' },
    { label: '用户管理', value: '2' },
    { label: '角色管理', value: '3' },
    { label: '菜单管理', value: '4' },
  ];
  return (
    <Modal
      title="创建菜单"
      open={props.visible}
      onOk={() => form.submit()}
      onCancel={props.onCancel}
      destroyOnClose
    >
      <Form
        name="创建菜单"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="菜单名称"
          name="menuName"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="路由名称"
          name="routeName"
          rules={[{ required: true, message: '请输入路由名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="路由路径"
          name="routePath"
          rules={[{ required: true, message: '请输入路由路径!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="组件路径"
          name="filePath"
          rules={[{ required: true, message: '请输入组件路径!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="路由图标" name="icon">
          <Select>
            <Option value="shezhi">
              <IconFont name="shezhi" />
            </Option>
            <Option value="shouye">
              <IconFont name="shouye" />
            </Option>
            <Option value="geren">
              <IconFont name="geren" />
            </Option>
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="上级目录"
          name="parentId"
          rules={[{ required: true, message: '请选择上级目录' }]}
        >
          <Select options={parentIdOptions}></Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="角色编码"
          name="roleCode"
          rules={[{ required: true, message: '请选择角色编码' }]}
        >
          <Select>
            <Option value="0">超级管理员</Option>
            <Option value="1">管理员</Option>
            <Option value="2">普通用户</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMenuForm;
