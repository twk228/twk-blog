import React, { useEffect, useState } from "react";
import AdminFilter from "../AdminComponents/AdminFilter/AdminFilter";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import AdminConfirmModal from "../AdminComponents/AdminConfirmModal/AdminConfirmModal";
import { Space, Button } from "antd";
import AdminModal from "./components/AdminModal";
import {
  getAdminNavClassData,
  addAdminNavClassData,
  editAdminNavClassData,
  deleteAdminNavClassData,
} from "@/api/admin-nav-api";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
let paramsData = {};
export default function AdminNav() {
  const addRef = React.createRef();
  const editRef = React.createRef();
  const delRef = React.createRef();
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const formData = [
    {
      type: "input",
      name: "title",
      label: "导航分类标题",
      placeholder: "请输入导航分类标题",
      rules: [
        {
          required: true,
          message: "导航分类标题不能为空！",
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
      title: "导航分类图标",
      dataIndex: "icon",
      key: "icon",
      render: (text) => (
        <img style={{ 'backgroundColor': '#001529', 'padding': '3px' }} src={text} alt="icon" />
    ),
    },
    {
      title: "导航分类标题",
      dataIndex: "title",
      key: "title",
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
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => goDetail(record)}
          />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    request();
  }, []);
  const showAddModal = () => {
    let record = {
      icon: "",
      title: "",
    };
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
    getAdminNavClassData(paramsData).then((res) => {
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
    const { code } = await addAdminNavClassData(params);
    if (code === 200) {
      request();
      addRef.current.hideModal();
    }
  };
  // 修改数据
  const edit = async (params = {}) => {
    const { code } = await editAdminNavClassData(params);
    if (code === 200) {
      request();
      editRef.current.hideModal();
    }
  };
  // 删除数据
  const del = async (params = {}) => {
    const { code } = await deleteAdminNavClassData(params);
    if (code === 200) {
      request();
    }
  };
  // 去详情页面
  const goDetail = (record) => {
    navigate(`/admin/nav/detail?id=${record._id}`);
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
      <AdminModal
        ref={addRef}
        navType="navClass"
        title={"新增"}
        okText={"新增"}
        submit={add}
      />
      <AdminModal
        ref={editRef}
        navType="navClass"
        title={"修改"}
        okText={"修改"}
        submit={edit}
      />
      <AdminConfirmModal
        ref={delRef}
        title={"删除确认框"}
        content={"删除该导航分类会把该分类下面的导航全部删除，确定要删除吗？"}
        onOk={del}
      />
    </div>
  );
}
