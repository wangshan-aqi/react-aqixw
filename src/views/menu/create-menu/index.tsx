import menuListServer from '@/api/menuApi';
import IconFont from '@/components/IconFont/IconFont';
import { antdUtils } from '@/utils/antd';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
const { Option } = Select;

type CreateMenuFormProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: () => void;
};

const CreateMenuForm: React.FC<CreateMenuFormProps> = props => {
  const { visible, onCancel, onSave } = props;
  const [menuParents, setMenuParents] = useState<
    { id: number; name: string }[]
  >([]);
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    values = {
      ...values,
      order: Number(values.order),
    };
    const [err, res] = await menuListServer.createMenu(values);
    // console.log(res, '----');
    if (!err) {
      onSave();
    } else {
      antdUtils.notification?.error({
        message: '出错了',
        description: res.message,
      });
    }
  };
  const getMenuParents = async () => {
    const [error, res] = await menuListServer.getParents({});
    if (!error) {
      if (res.data.length > 0) {
        setMenuParents(res.data);
      }
    }
  };

  useEffect(() => {
    getMenuParents();

    if (visible) {
      // if (editData) {
      //   form.setFieldsValue(editData);
      // } else if (curRecord) {
      //   form.setFieldsValue({
      //     show: true,
      //     type: curRecord?.type === MenuType.MENU ? MenuType.MENU : MenuType.DIRECTORY,
      //   })
      // } else {
      //   form.setFieldsValue({
      //     show: true,
      //     type: MenuType.DIRECTORY,
      //   })
      // }
    } else {
      form.resetFields();
    }
  }, [visible]);

  const antdIcons = [
    { label: '设置', value: 'shezhi' },
    { label: '首页', value: 'shouye' },
    { label: '个人', value: 'geren' },
  ];

  return (
    <Modal
      forceRender
      title="创建菜单"
      open={visible}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      destroyOnClose
    >
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        labelCol={{ flex: '0 0 100px' }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="菜单名称"
          name="menuName"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
        >
          <Input placeholder="菜单名称，首页" />
        </Form.Item>

        <Form.Item
          label="路由名称"
          name="routeName"
          rules={[{ required: true, message: '请输入路由名称!' }]}
        >
          <Input placeholder="路由名称，Home" />
        </Form.Item>
        <Form.Item
          label="路由路径"
          name="routePath"
          rules={[{ required: true, message: '请输入路由路径!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="组件路径"
          name="filePath"
          rules={[{ required: true, message: '请输入组件路径!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="路由图标" name="icon">
          <Select>
            {antdIcons.map(({ label, value }) => (
              <Select.Option key={label} label={label}>
                <IconFont name={value} />
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="上级目录" name="parentId">
          <Select>
            {menuParents.map((item, key) => (
              <Select.Option key={item.name}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="序号"
          name="order"
          rules={[{ required: true, message: '请输入序号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="角色编码"
          name="roleCode"
          rules={[{ required: true, message: '请选择角色编码' }]}
        >
          <Select>
            <Select.Option value="0">超级管理员</Select.Option>
            <Select.Option value="1">管理员</Select.Option>
            <Select.Option value="2">普通用户</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="是否可编辑"
          name="canModify"
          rules={[{ required: true, message: '请选择是否可编辑' }]}
        >
          <Select>
            <Select.Option value={0}>否</Select.Option>
            <Select.Option value={1}>是</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMenuForm;
