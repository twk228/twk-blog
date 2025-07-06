import request from "@/common/request";

// 获取我的导航分类表数据
export const getAdminNavClassData = (params) => {
  return request({
    url: "/api/nav/getNavClassList",
    method: "get",
    params,
  });
};

// 添加我的导航分类数据
export const addAdminNavClassData = (data) => {
  return request({
    url: "/api/nav/addNavClassData",
    method: "post",
    data,
  });
};

// 修改我的导航分类数据
export const editAdminNavClassData = (data) => {
  return request({
    url: "/api/nav/editNavClassData",
    method: "put",
    data,
  });
};

// 删除我的导航分类数据
export const deleteAdminNavClassData = (params) => {
  return request({
    url: "/api/nav/deleteNavClassData",
    method: "delete",
    params,
  });
};

// 获取我的导航表数据
export const getAdminNavData = (params) => {
  return request({
    url: "/api/nav/getNavList",
    method: "get",
    params,
  });
};

// 添加我的导航数据
export const addAdminNavData = (data) => {
  return request({
    url: "/api/nav/addNavData",
    method: "post",
    data,
  });
};

// 修改我的导航数据
export const editAdminNavData = (data) => {
  return request({
    url: "/api/nav/editNavData",
    method: "put",
    data,
  });
};

// 删除我的导航数据
export const deleteAdminNavData = (params) => {
  return request({
    url: "/api/nav/deleteNavData",
    method: "delete",
    params,
  });
};
