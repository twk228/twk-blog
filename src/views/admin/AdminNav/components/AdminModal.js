import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Form, Input, Space, Image, message } from "antd";
import propTypes from "prop-types";

const AdminModal = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [iconShow, setIconShow] = useState(false);
  const [formData, setFormData] = useState({
    icon: "", // 图标
    title: "", // 标题
  });
  const showModal = (record) => {
    setOpen(true);
    setFormData(record);
    console.log('record', record);
    record.icon && setIconShow(true);
    form.setFieldsValue(record);
  };
  const hideModal = () => {
    form.resetFields();
    setOpen(false);
  };
  const onFinish = () => {
    console.log('form', form);
    if (!form.getFieldValue("icon")) {
      form.submit("form");
      return;
    }
    if (!iconShow) {
      message.error('请上传可以正常访问的图标链接');
      return;
    }
    if (!form.getFieldValue("title")) {
      form.submit("form");
      return;
    }
    let data = form.getFieldsValue();
    if (formData._id) {
      data._id = formData._id;
    }
    props.submit(data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 通过ref暴露给父组件的属性和方法
  useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
  }));
  return (
    <Modal
      title={props.title}
      open={open}
      onOk={onFinish}
      onCancel={hideModal}
      okText={props.okText}
      cancelText="取消"
    >
      <Form
        name="form"
        form={form}
        labelCol={{
          flex: "120px",
        }}
        labelAlign="left"
        wrapperCol={{
          flex: 1,
        }}
        style={{
          maxWidth: 1000,
          position: "relative",
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="导航分类图标"
          name="icon"
          rules={[
            {
              required: true,
              message: "请输入图标链接",
            },
            {
              type: 'url',
              message: '请输入正确的链接',
            },
          ]}
        >
          <Space>
            <Form.Item name="icon" noStyle>
              <Input
                placeholder="请输入图标链接"
                value={formData.icon}
                allowClear
                onChange={(e) => {
                  const value = e.target.value;
                  let data = JSON.parse(JSON.stringify(formData));
                  data.icon = value;
                  setFormData(data);
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setIconShow(true);
                  } else {
                    setIconShow(false);
                  }
                }}
              />
            </Form.Item>
            <div>
              {iconShow ? <Image style={{ 'backgroundColor': '#001529', 'padding': '3px' }} width={50} src={formData.icon} /> : ''}
            </div>
          </Space>
        </Form.Item>
        <Form.Item
          label="导航分类标题"
          name="title"
          rules={[
            {
              required: true,
              message: "请输入导航分类标题",
            },
          ]}
        >
          <Input
            placeholder="请输入导航分类标题"
            value={formData.title}
            onChange={(value) => {
              let data = JSON.parse(JSON.stringify(formData));
              data.title = value;
              setFormData(data);
            }}
          />
        </Form.Item>
        {props.navType === "nav" ? (
          <Form.Item
            label="导航链接"
            name="url"
            rules={[
              {
                required: true,
                message: "请输入导航链接",
              },
            ]}
          >
            <Input
              placeholder="请输入导航链接"
              value={formData.url}
              onChange={(value) => {
                let data = JSON.parse(JSON.stringify(formData));
                data.url = value;
                setFormData(data);
              }}
            />
          </Form.Item>
        ) : (
          ""
        )}
      </Form>
    </Modal>
  );
});
AdminModal.propTypes = {
  // 类型
  navType: propTypes.string,
  // 标题
  title: propTypes.string,
  // ok文本
  okText: propTypes.string,
  // 表单数据
  formData: propTypes.object,
  // 提交方法
  submit: propTypes.func,
};

export default AdminModal;
