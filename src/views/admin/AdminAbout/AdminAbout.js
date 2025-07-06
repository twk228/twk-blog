import React, { useEffect, useState } from "react";
import AdminFilter from "../AdminComponents/AdminFilter/AdminFilter";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import AdminConfirmModal from "../AdminComponents/AdminConfirmModal/AdminConfirmModal";
import { Space, Button } from "antd";
import AddModal from "./components/AdminModal";
import {
  getAdminAboutData,
  addAdminAboutData,
  editAdminAboutData,
  deleteAdminAboutData,
} from "@/api/admin-about-api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { handleText } from "@/common";
let paramsData = {};
export default function AdminAbout() {
  const addRef = React.createRef();
  const editRef = React.createRef();
  const delRef = React.createRef();
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const formData = [
    {
      type: "input",
      name: "title",
      label: "标题",
      placeholder: "请输入标题",
      rules: [
        {
          required: true,
          message: "标题不能为空！",
        },
      ],
    },
  ];
  const columnData = [
    {
      title: "序号",
      dataIndex: "index",
      rowScope: "row",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "代码",
      dataIndex: "code",
      key: "code",
      width: 500,
      render: (text) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            cursor: "pointer",
          }}
          title={text}
        >
          {handleText(text,80)}
        </div>
      ),
    },
    {
      title: "操作",
      key: "_id",
      render: (_, record) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showDelModal(record)}
          />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    request();
  }, []);
  const showAddModal = (record = { code: "请输入代码" }) => {
    addRef.current.showModal(record);
  };
  const showEditModal = (record) => {
    editRef.current.showModal(record);
  };
  const showDelModal = (record) => {
    delRef.current.confirm({ id: record._id });
  };
  // 请求数据
  const request = async (params = {}) => {
    let paramsKeys = Object.keys(params);
    if (paramsKeys.length > 0) {
      paramsKeys.forEach((item) => {
        paramsData[item] = params[item];
      });
    }
    getAdminAboutData(paramsData).then((res) => {
      if (res.code === 200) {
        const { data, total } = res;
        data.forEach((item, index) => {
          item.index = index + 1;
        });
        setTableData(data);
        setTotal(total);
      }
    });
  };
  // 添加数据
  const add = async (params = {}) => {
    const { code } = await addAdminAboutData(params);
    if (code === 200) {
      request();
      addRef.current.hideModal();
    }
  };
  // 修改数据
  const edit = async (params = {}) => {
    const { code } = await editAdminAboutData(params);
    if (code === 200) {
      request();
      editRef.current.hideModal();
    }
  };
  // 删除数据
  const del = async (params = {}) => {
    const { code } = await deleteAdminAboutData(params);
    if (code === 200) {
      request();
    }
  };
  return (
    <div className="AdminAbout">
      <AdminFilter formData={formData} requestData={request} />
      <AdminTable
        columnData={columnData}
        tableData={tableData}
        totalPage={total}
        requestData={request}
      >
        <Button type="primary" onClick={showAddModal}>
          新增
        </Button>
      </AdminTable>
      <AddModal ref={addRef} title={"新增"} okText={"新增"} submit={add} />
      <AddModal ref={editRef} title={"修改"} okText={"修改"} submit={edit} />
      <AdminConfirmModal
        ref={delRef}
        title={"删除确认框"}
        content={"确定要删除吗？"}
        onOk={del}
      />
    </div>
  );
}
