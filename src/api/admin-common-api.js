import request from "@/common/request";

// 提交代码到git仓库接口
export const gitCommitApi = (params = {}) => {
  return request({
    url: "/api/index/gitCommit",
    method: "get",
    params,
  });
};