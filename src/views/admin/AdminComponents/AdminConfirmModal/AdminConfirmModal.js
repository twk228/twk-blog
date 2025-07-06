import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useImperativeHandle, forwardRef } from "react";
import { Modal } from "antd";
import propTypes from "prop-types";
const AdminConfirmModal = forwardRef((props, ref) => {
  const [modal, contextHolder] = Modal.useModal();
  const confirm = ({ id }) => {
    modal.confirm({
      title: props.title,
      icon: <ExclamationCircleOutlined />,
      content: props.content,
      okText: "确认",
      onOk: () => {
        props.onOk({ id });
      },
      cancelText: "取消",
      onCancel: () => {
        console.log("取消");
      },
    });
  };
  useImperativeHandle(ref, () => ({
    confirm,
  }));
  return <>{contextHolder}</>;
});

AdminConfirmModal.propTypes = {
  // 标题
  title: propTypes.string,
  // 内容
  content: propTypes.string,
  // 确认事件
  onOk: propTypes.func,
};

export default AdminConfirmModal;
