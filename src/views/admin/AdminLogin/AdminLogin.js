import React from "react";
import "./AdminLogin.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { adminLogin } from "@/api/admin-login-api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    adminLogin(values).then((res) => {
      if (res.code === 200 && res.desc === "success") {
        const { token } = res.data;
        localStorage.setItem("token", token);
        message.success("登录成功");
        navigate("/admin");
      } else {
        message.error("用户名或密码错误");
      }
    });
  };
  return (
    <div className="admin-login">
      <div className="section">
        <div className="header">欢迎登陆后台管理系统</div>
        <div className="form-box">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入你的用户名",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入你的密码",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item className="fl-cen-sta">
              <Button
                style={{width: "32vw"}}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
              <Button style={{float: "right"}} type="link" onClick={() => navigate("/front")}>返回前台</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
