// import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Modal, Form, Input } from "antd";
import propTypes from "prop-types";
import MonacoEditor from 'react-monaco-editor';

const AdminModal = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const iframeRef = useRef();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("请输入代码");
  const showModal = (record) => {
    setOpen(true);
    setId(record._id);
    setTitle(record.title);
    setCode(record.code);
    form.setFieldsValue(record);
  };
  const hideModal = () => {
    form.resetFields();
    setOpen(false);
  };
  const onFinish = () => {
    if (!title || !code) {
      form.submit("form");
      return;
    }
    let data = form.getFieldsValue();
    console.log(data, "data");
    if (id) {
      data._id = id;
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
      width={1000}
    >
      <Form
        name="form"
        form={form}
        labelCol={{
          flex: "80px",
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
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: "请输入标题",
            },
          ]}
        >
          <Input
            placeholder="请输入标题"
            value={title}
            onChange={(value) => {
              setTitle(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="代码"
          name="code"
          rules={[
            {
              required: true,
              message: "请输入代码",
            },
          ]}
        >
          <div style={{ width: "100%", height: "50vh", display: "flex" }}>
            <Form.Item name="code" noStyle>
              <MonacoEditor
                language="html"
                value={code}
                onChange={(value) => {
                  setCode(value); // 输出代码编辑器内值改变后的值
                }}
                options={{
                  selectOnLineNumbers: true,
                  roundedSelection: false,
                  readOnly: false, // 是否只读
                  cursorStyle: "line",
                  automaticLayout: false,
                }}
                theme="vs-dark"
                width="50%"
                height="100%"
              >
              </MonacoEditor>
            </Form.Item>
            <iframe
              ref={iframeRef}
              srcDoc={code}
              title="result"
              style={{ height: "100%", width: "50%" }}
            ></iframe>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
});
AdminModal.propTypes = {
  // 标题
  title: propTypes.string,
  // ok文本
  okText: propTypes.string,
  // 表单数据
  formData: propTypes.object,
};

export default AdminModal;
