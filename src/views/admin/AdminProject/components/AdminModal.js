import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Form, Input, Image, message, Radio, Select, Space } from "antd";
import propTypes from "prop-types";

const { TextArea } = Input;

const AdminModal = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [iconShow, setIconShow] = useState(false);
  const [bgShow, setBgShow] = useState(false);
  const [formData, setFormData] = useState({
    tagList: [], // 标签
    icon: "", // 图标
    bg: "", // 封面
    desc: "", // 描述
    ptype: "", // 类型
  });
  const showModal = (record) => {
    setOpen(true);
    if (props.modalType === 'edit') {
      setFormData(record);
      form.setFieldsValue(record);
      record.icon && setIconShow(true);
      record.bg && setBgShow(true);
      return;
    }
    let data = {
      tagList: [], // 标签
      icon: "", // 图标
      bg: "", // 封面
      desc: "", // 描述
      ptype: "", // 类型
    };
    setIconShow(false);
    setBgShow(false);
    form.setFieldsValue(data);
  };
  const hideModal = () => {
    form.resetFields();
    setOpen(false);
  };
  const onFinish = () => {
    if (!form.getFieldValue("tagList")) {
      form.submit("form");
      return;
    }
    if (!form.getFieldValue("icon")) {
      form.submit("form");
      return;
    }
    if (!iconShow) {
      message.error('请上传可以正常访问的图标链接');
      return;
    }
    if (!form.getFieldValue("bg")) {
      form.submit("form");
      return;
    }
    if (!bgShow) {
      message.error('请上传可以正常访问的封面链接');
      return;
    }
    if (!form.getFieldValue("desc")) {
      form.submit("form");
      return;
    }
    if (!form.getFieldValue("ptype")) {
      form.submit("form");
      return;
    }
    let data = form.getFieldsValue();
    if (formData._id) {
      data._id = formData._id;
    }
    console.log(data, "data");
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
          label="项目标签"
          name="tagList"
          rules={[
            {
              required: true,
              message: "请设置项目标签",
            },
          ]}
        >
          <Select
            mode="tags"
            style={{
              width: '100%',
            }}
            placeholder="请设置项目标签"
            onChange={(value) => {
              let data = JSON.parse(JSON.stringify(formData));
              data.tagList = value;
              setFormData(data);
            }}
            options={[
              { value: 'Vue2', label: "Vue2" },
              { value: 'Vue3', label: "Vue3" },
              { value: 'React', label: "React" },
              { value: 'uni-app', label: "uni-app" },
              { value: "Element UI", label: "Element UI" },
              { value: "Vant", label: "Vant" },
              { value: "Vuex", label: "Vuex" },
              { value: "Pinia", label: "Pinia" },
              { value: "Ant Design", label: "Ant Design" },
              { value: "Javascript", label: "Javascript" },
              { value: "Typescript", label: "Typescript" },
              { value: "Echarts", label: "Echarts" },
              { value: "D3", label: "D3" },
              { value: "G6", label: "G6" },
              { value: "jQuery", label: "jQuery" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="图标链接"
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
              {iconShow ? <Image style={{ 'backgroundColor': '#001529', 'padding': '3px' }} width={50} src={formData.icon} onError={() => { setIconShow(false) }} /> : ''}
            </div>
          </Space>
        </Form.Item>
        <Form.Item
          label="封面链接"
          name="bg"
          rules={[
            {
              required: true,
              message: "请输入封面链接",
            },
            {
              type: 'url',
              message: '请输入正确的链接',
            },
          ]}
        >
          <Space>
            <Form.Item name="bg" noStyle>
              <Input
                placeholder="请输入封面链接"
                value={formData.bg}
                allowClear
                onChange={(e) => {
                  const value = e.target.value;
                  let data = JSON.parse(JSON.stringify(formData));
                  data.bg = value;
                  setFormData(data);
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setBgShow(true);
                  } else {
                    setBgShow(false);
                  }
                }}
              />
            </Form.Item>
            <div>
              {bgShow ? <Image width={100} src={formData.bg} onError={() => { setBgShow(false) }} /> : ''}
            </div>
          </Space>
        </Form.Item>
        <Form.Item
          label="项目描述"
          name="desc"
          rules={[
            {
              required: true,
              message: "请输入项目描述",
            },
          ]}
        >
          <TextArea
            placeholder="请输入项目描述"
            value={formData.desc}
            onChange={(e) => {
              let value = e.target.value;
              formData.desc = value;
              setFormData(formData);
            }}
            showCount
            maxLength={256}
            allowClear
            autoSize={{
              minRows: 2,
              maxRows: 3,
            }}
          />
        </Form.Item>
        <Form.Item
          label="项目类型"
          name="ptype"
          rules={[
            {
              required: true,
              message: "请选择项目类型",
            },
          ]}
        >
          <Radio.Group
            value={formData.ptype}
            onChange={(e) => {
              let value = e.target.value;
              formData.ptype = value;
              setFormData(formData);
            }}
            options={[
              { value: 'PC', label: "PC" },
              { value: 'H5', label: "H5" },
              { value: "APP-PLUS", label: "APP-PLUS" },
              { value: "MP-WEIXIN", label: "MP-WEIXIN" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
AdminModal.propTypes = {
  // 类型
  modalType: propTypes.string,
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
