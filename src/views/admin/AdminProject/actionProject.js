import React, { useEffect, useState } from "react";
import "./actionProject.scss";
import Editor from '@/components/MdEditor/index';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, message } from "antd";
import AdminModal from "./components/AdminModal";
import {
    LeftOutlined,
} from "@ant-design/icons";
import { addAdminProjectData, editAdminProjectData, getAdminProjectDetail } from "@/api/admin-project-api";


export default function AddProject() {
    const modalRef = React.createRef();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [pageType, setPageType] = useState("");
    // 文章详情数据
    const [projectData, setProjectData] = useState({});
    // 编辑器配置，可以根据自己需要决定是否显示
    const toolbar = {
        B: true, // 加粗
        h1: true, // h1
        h2: true, // h2
        h3: true, // h3
        h4: true, // h4
        img: true, // 图片
        ul: true, // 无序列表
        ol: true, // 有序列表
        table: true, // 表格
        quote: true, // 引用
        link: true, // 链接
        code: true, // 代码块
        preview: true, // 预览
        expand: true, // 全屏
        /* v0.0.9 */
        undo: true, // 撤销
        redo: true, // 重做
        save: true, // 保存
        /* v0.2.3 */
        subfield: true, // 单双栏模式
    }
    // 文章标题
    const [title, setTitle] = useState("");
    // 文章内容
    const [mdContent, setMdContent] = useState(``)

    // 修改编辑器内容
    const handleMdContentChange = (val) => {
        console.log(val)
        setMdContent(val)
    }

    // 修改文章标题
    const handleTitleChange = (e) => {
        let val = e.target.value;
        setTitle(val);
    }

    // 返回方法
    const back = () => {
        navigate(-1);
    }
    // 发布方法
    const publish = () => {
        if (title.length < 1) {
            message.error("请先填写1~100个字作为项目名称");
            return;
        }
        if (!mdContent.length) {
            message.error("请先填写文章内容");
            return;
        }
        modalRef.current.showModal(projectData);
    }
    // 提交方法
    const submit = (data) => {
        let params = {
            ...data,
            title,
            mdContent
        }
        modalRef.current.hideModal();
        if (pageType === "add") {
            addAdminProjectData(params).then((res) => {
                if (res.code === 200) {
                    message.success("发布成功");
                    navigate(-1);
                }
            })
        }
        if (pageType === "edit") {
            editAdminProjectData(params).then((res) => {
                if (res.code === 200) {
                    message.success("修改成功");
                    navigate(-1);
                }
            })
        }
    }
    useEffect(() => {
        let pageType = searchParams.get("pageType") || '';
        let id = searchParams.get("id") || '';
        setPageType(pageType);
        if (pageType === "edit") {
            getAdminProjectDetail({ id }).then((res) => {
                if (res.code === 200) {
                    setProjectData(res.data);
                    setMdContent(res.data.mdContent);
                    setTitle(res.data.title);
                }
            })
        }
    }, [searchParams]);

    return (
        <div className="action-project">
            <div className="action-project-header mr-b-10">
                <Button className="mr-r-10" type="primary" icon={<LeftOutlined />} onClick={back}>
                    返回项目管理
                </Button>
                <Input placeholder="请输入项目名称（5~100个字）" value={title} showCount minLength={1} maxLength={100} allowClear onChange={handleTitleChange} />
                <Button className="mr-l-10" type="primary" onClick={publish}>
                    发布
                </Button>
            </div>
            <div className="action-project-main">
                <Editor toolbar={toolbar} value={mdContent} onChange={handleMdContentChange} height={'100%'} preview={true} subfield={true} />
            </div>
            <AdminModal
                ref={modalRef}
                modalType={pageType}
                title={"发布文章"}
                okText={"发布"}
                submit={submit}
            />
        </div>
    );
}
