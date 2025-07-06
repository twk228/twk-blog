import React, { useEffect, useState } from "react";
import AdminFilter from "../AdminComponents/AdminFilter/AdminFilter";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import AdminConfirmModal from "../AdminComponents/AdminConfirmModal/AdminConfirmModal";
import { Space, Button } from "antd";
import AdminModal from "./components/AdminModal";
import {
  getAdminNavData,
  addAdminNavData,
  editAdminNavData,
  deleteAdminNavData,
} from "@/api/admin-nav-api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
let paramsData = {};
export default function AdminNav() {
  const navigate = useNavigate();
  const addRef = React.createRef();
  const editRef = React.createRef();
  const delRef = React.createRef();
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();
  const formData = [
    {
      type: "input",
      name: "title",
      label: "导航标题",
      placeholder: "请输入导航标题",
      rules: [
        {
          required: true,
          message: "导航标题不能为空！",
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
      title: "导航图标",
      dataIndex: "icon",
      key: "icon",
      render: (_, record) => <img style={{ 'backgroundColor': '#001529', 'padding': '3px', width: '40px', height: '40px' }} src={record.icon} alt="icon" />,
    },
    {
      title: "导航标题",
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
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const navClassId = searchParams.get("id");
    paramsData.navClassId = navClassId;
    request();
  }, [searchParams]);
  const showAddModal = () => {
    let record = {
      icon: "",
      title: "",
      url: "",
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
    const { data, total } = await getAdminNavData(paramsData);
    data.forEach((item, index) => {
      item.index = index + 1;
    });
    setTableData(data);
    setTotal(total);
  };
  // 添加数据
  const add = async (params = {}) => {
    params.navClass = paramsData.navClassId;
    const { code } = await addAdminNavData(params);
    if (code === 200) {
      request();
      addRef.current.hideModal();
    }
  };
  // 修改数据
  const edit = async (params = {}) => {
    params.navClassId = paramsData.navClassId;
    const { code } = await editAdminNavData(params);
    if (code === 200) {
      request();
      editRef.current.hideModal();
    }
  };
  // 删除数据
  const del = async (params = {}) => {
    const { code } = await deleteAdminNavData(params);
    if (code === 200) {
      request();
    }
  };
  // 返回导航分类
  const back = () => {
    navigate(-1);
  }
  return (
    <div className="AdminAbout">
      <AdminFilter formData={formData} requestData={request} />
      <AdminTable
        columnData={columnData}
        tableData={tableData}
        totalPage={total}
        requestData={request}
      >
        <>
          <Button className="mr-r-10" type="primary" onClick={back}>
            返回导航分类
          </Button>
          <Button type="primary" onClick={showAddModal}>
            新增
          </Button>
        </>
      </AdminTable>
      <AdminModal ref={addRef} navType="nav" title={"新增"} okText={"新增"} submit={add} />
      <AdminModal ref={editRef} navType="nav" title={"修改"} okText={"修改"} submit={edit} />
      <AdminConfirmModal
        ref={delRef}
        title={"删除确认框"}
        content={"确定要删除该导航吗？"}
        onOk={del}
      />
    </div>
  );
}
