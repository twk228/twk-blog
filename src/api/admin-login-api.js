import request from "@/common/request";

// 后台登录接口
export const adminLogin = (data) => {
  return request({
    url: "/api/admin/adminLogin",
    method: "post",
    data,
  });
};