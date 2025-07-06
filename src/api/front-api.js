import request from "@/common/request";

// 获取导航分类以及导航数据
export const getNavData = (params) => {
    return request({
        url: "/api/front/getNavData",
        method: "get",
        params,
    });
};

// 获取关于我表数据
export const getAboutList = (params) => {
    return request({
        url: "/api/front/getAboutList",
        method: "get",
        params,
    });
};

// 获取项目表数据
export const getProjectList = (params) => {
    return request({
        url: "/api/front/getProjectList",
        method: "get",
        params,
    });
};

// 获取项目详情数据
export const getProjectData = (params) => {
    return request({
        url: "/api/front/getProjectData",
        method: "get",
        params,
    });
};