import React from "react";
import { useNavigate } from "react-router-dom";
import {
  //   AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  //   MailOutlined,
  PieChartOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./AdminMenu.scss";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("首页", "/admin", <PieChartOutlined />),
  getItem("关于我管理", "/admin/about", <DesktopOutlined />),
  getItem("我的导航管理", "/admin/nav", <ContainerOutlined />),
  getItem("我的项目管理", "/admin/project", <ProjectOutlined />),
  //   getItem('Navigation One', 'sub1', <MailOutlined />, [
  //     getItem('Option 5', '5'),
  //     getItem('Option 6', '6'),
  //     getItem('Option 7', '7'),
  //     getItem('Option 8', '8'),
  //   ]),
  //   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
  //     getItem('Option 9', '9'),
  //     getItem('Option 10', '10'),
  //     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  //   ]),
];
const App = () => {
  const navigate = useNavigate();
  const changeMenu = (item) => {
    let path = item.keyPath[0];
    navigate(path);
  };
  let currentPath = window.location.hash.replace("#", "");
  if (currentPath === "/admin/nav/detail") {
    currentPath = "/admin/nav";
  }
  return (
    <Menu
      defaultSelectedKeys={[currentPath]}
      //   defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      items={items}
      onClick={changeMenu}
    />
  );
};
export default App;
