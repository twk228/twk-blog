import React, { useState, forwardRef, useImperativeHandle } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import propTypes from "prop-types";
import { serverURL } from "@/apiConfig";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadCom = forwardRef((props, ref) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(props.fileList || []);
  const [path, setPath] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList.length) {
      const res = newFileList[0].response;
      if (res?.code === 200) {
        setPath(res.path);
        props.uploadFunc(res.path);
      }
    }
    setFileList(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const beforeUpload = (file) => {
    const isAccepted = props.acceptTypes.includes(file.type);
    if (!isAccepted) {
      message.error(`您只能上传 ${props.acceptTypes.join("/")} 格式的文件`);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("上传图片的大小不能超过2MB!");
    }
    return isAccepted && isLt2M;
  };

  // 通过ref暴露给父组件的属性和方法
  useImperativeHandle(ref, () => ({
    path,
  }));

  return (
    <>
      <Upload
        action= {serverURL + "/api/index/upload"}
        accept={props.acceptTypes.join(",")}
        beforeUpload={beforeUpload}
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
});

UploadCom.propTypes = {
  // 上传可以接收的文件格式
  acceptTypes: propTypes.array,
  // 上传文件后回调函数
  uploadFunc: propTypes.func,
  // 文件列表
  fileList: propTypes.array,
};

export default UploadCom;
