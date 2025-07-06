import request from "@/common/request";

// 获取项目表数据
export const getAdminProjectData = (params) => {
    return request({
        url: "/api/project/getProjectList",
        method: "get",
        params,
    });
};

// 获取项目详情数据
export const getAdminProjectDetail = (params) => {
    return request({
        url: "/api/project/getProjectData",
        method: "get",
        params,
    });
};

// 添加关于我数据
export const addAdminProjectData = (data) => {
    return request({
        url: "/api/project/addProjectData",
        method: "post",
        data,
    });
};

// 修改关于我数据
export const editAdminProjectData = (data) => {
    return request({
        url: "/api/project/editProjectData",
        method: "put",
        data,
    });
};

// 删除关于我数据
export const deleteAdminProjectData = (params) => {
    return request({
        url: "/api/project/deleteProjectData",
        method: "delete",
        params,
    });
};
