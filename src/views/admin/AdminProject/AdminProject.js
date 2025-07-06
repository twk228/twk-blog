import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminFilter from "../AdminComponents/AdminFilter/AdminFilter";
import AdminTable from "../AdminComponents/AdminTable/AdminTable";
import AdminConfirmModal from "../AdminComponents/AdminConfirmModal/AdminConfirmModal";
import { Space, Button, Tag, Image } from "antd";
import {
    getAdminProjectData,
    deleteAdminProjectData,
} from "@/api/admin-project-api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { handleText, handleFormatDate } from "@/common";
let paramsData = {};
export default function AdminProject() {
    const navigate = useNavigate();
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
            fixed: 'left',
        },
        {
            title: "图标",
            dataIndex: "icon",
            key: "icon",
            width: 100,
            render: (text) => (
                <img style={{ 'backgroundColor': '#001529', 'padding': '3px' }} src={text} alt="icon" />
            ),
        },
        {
            title: "封面",
            dataIndex: "bg",
            key: "bg",
            width: 150,
            render: (text) => (
                <Image width={100} src={text} />
            ),
        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
            width: 300,
        },
        {
            title: "描述",
            dataIndex: "desc",
            key: "desc",
            width: 300,
            render: (text) => (
                <div
                    style={{
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                    }}
                    title={text}
                >
                    {handleText(text, 20)}
                </div>
            ),
        },
        {
            title: "标签",
            dataIndex: "tagList",
            key: "tagList",
            width: 300,
            render: (_, { tagList }) => (
                <>
                    {tagList.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "浏览量",
            dataIndex: "viewNum",
            key: "viewNum",
            width: 100,
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            width: 200,
            render: (text) => (
                <div>{handleFormatDate(text)}</div>
            ),
        },
        {
            title: "md 内容",
            dataIndex: "mdContent",
            key: "mdContent",
            width: 300,
            render: (text) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                    }}
                    title={text}
                >
                    {handleText(text, 30)}
                </div>
            ),
        },
        {
            title: "操作",
            key: "_id",
            width: 120,
            fixed: 'right',
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
    const showAddModal = () => {
        navigate(`/admin/action-project?pageType=add`);
    };
    const showEditModal = (record) => {
        navigate(`/admin/action-project?pageType=edit&id=${record._id}`);
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
        getAdminProjectData(paramsData).then((res) => {
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
    // 删除数据
    const del = async (params = {}) => {
        const { code } = await deleteAdminProjectData(params);
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
            <AdminConfirmModal
                ref={delRef}
                title={"删除确认框"}
                content={"确定要删除吗？"}
                onOk={del}
            />
        </div>
    );
}
