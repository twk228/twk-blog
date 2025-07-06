import request from "@/common/request";

// 获取关于我表数据
export const getAdminAboutData = (params) => {
  return request({
    url: "/api/about/getAboutList",
    method: "get",
    params,
  });
};

// 添加关于我数据
export const addAdminAboutData = (data) => {
  return request({
    url: "/api/about/addAboutData",
    method: "post",
    data,
  });
};

// 修改关于我数据
export const editAdminAboutData = (data) => {
  return request({
    url: "/api/about/editAboutData",
    method: "put",
    data,
  });
};

// 删除关于我数据
export const deleteAdminAboutData = (params) => {
  return request({
    url: "/api/about/deleteAboutData",
    method: "delete",
    params,
  });
};
