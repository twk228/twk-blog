import React from "react";
import "./Footer.scss";
import {
  EnvironmentOutlined,
  QqOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { goAnchor } from "../../common";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  // 去智慧系列
  const toZhi = () => {
    goAnchor(".zhihui");
  };
  // 去经典案例
  const toAnli = () => {
    goAnchor(".anli");
  };
  // 去关于我页面
  const toAbout = () => {
    navigate("/front/about");
  };
  // 去我的导航页面
  const toNav = () => {
    navigate("/front/nav");
  };
  // 去详情页面
  const toDetail = (name, type) => {
    navigate("/front/detail?name=" + name + "&type=" + type);
  };
  return (
    <div className="footer">
      <div className="inner">
        <div className="item">
          <div className="con">
            <h2>更多项目</h2>
            <div className="zi">
              <span
                className="a"
                onClick={() => {
                  toDetail("智慧电商可视化管理", "pc");
                }}
              >
                智慧电商
              </span>
            </div>
            <div className="zi">
              <span
                className="a"
                onClick={() => {
                  toDetail("智慧车联网可视化管理", "pc");
                }}
              >
                智慧车联网平台
              </span>
            </div>
            <div className="zi">
              <span
                className="a"
                onClick={() => {
                  toDetail("智慧旅游可视化管理", "pc");
                }}
              >
                智慧旅游
              </span>
            </div>
            <div className="zi">
              <span
                className="a"
                onClick={() => {
                  toDetail("掌上租", "app");
                }}
              >
                掌上租
              </span>
            </div>
            <div className="zi">
              <span
                className="a"
                onClick={() => {
                  toDetail("影尚客", "app");
                }}
              >
                影尚客
              </span>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="con">
            <h2>更多内容</h2>
            <div className="zi">
              <span className="a" onClick={toZhi}>
                智慧系列
              </span>
            </div>
            <div className="zi">
              <span className="a" onClick={toAnli}>
                经典案例
              </span>
            </div>
            <div className="zi">
              <span className="a" onClick={toAbout}>
                关于我
              </span>
            </div>
            <div className="zi">
              <span className="a" onClick={toNav}>
                我的导航
              </span>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="con">
            <h2>座右铭</h2>
            <div className="zi">自立更生</div>
            <div className="zi">合力更新</div>
            <div className="zi">有容乃大</div>
            <div className="zi">不懈则优</div>
          </div>
        </div>
        <div className="item">
          <div className="con">
            <h2>联系我</h2>
            <div className="zi">
              <EnvironmentOutlined />
              <span style={{ marginLeft: "5px" }}>河北省邯郸市</span>
            </div>
            <div className="zi">
              <MailOutlined />
              <span style={{ marginLeft: "5px" }}>twk22856@163.com</span>
            </div>
            <div className="zi">
              <PhoneOutlined />
              <span style={{ marginLeft: "5px" }}>17357434032（同微信）</span>
            </div>
            <div className="zi">
              <QqOutlined />
              <span style={{ marginLeft: "5px" }}>2792337073</span>
            </div>
            <div className="zi">
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a style={{ textDecoration: "none", color: "white", fontSize: "14px" }} href="https://beian.miit.gov.cn/" target="_blank">
                备案号：
              </a>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a style={{ textDecoration: "none", color: "white", fontSize: "14px" }} href="https://beian.miit.gov.cn/" target="_blank">
                冀ICP备 2023035681号-1
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
