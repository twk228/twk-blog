import React, { useState, useEffect } from "react";
import "./Nav.scss";
import { goAnchor } from "../../common";
import { Drawer } from 'antd';
import { MenuOutlined } from "@ant-design/icons";
import { getNavData } from "@/api/front-api";

export default function Nav() {
  const [list, setList] = useState([]);
  const [selectIdx, setSelectIds] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const [imgErrIndexArr, setImgErrIndexArr] = useState([])

  useEffect(() => {
    request();
  }, []);
  // 路由跳转
  const selectNav = async (idx) => {
    setSelectIds(idx);
    onClose();
    goAnchor("#nav_" + idx);
  };
  // 请求数据
  const request = async (params = {}) => {
    getNavData(params).then((res) => {
      if (res.code === 200) {
        const { data } = res;
        data.forEach(item1 => {
          item1.children.forEach(item2 => {
            item2.ImgIsError = false;
          })
        })
        setSelectIds(0);
        setList(data);
      }
    });
  };
  const showDrawer = (type) => {
    setOpen(!open);
    setPlacement(type);
  };
  const onClose = () => {
    setOpen(false);
  };
  // 新标签页打开页面
  const toBlank = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="nav">
      <div className="side">
        <ul id="nav">
          {list.map((item, index) => (
            <li
              key={index}
              className={
                index === selectIdx
                  ? "nav-active fl-sta-cen ellipsis"
                  : "fl-sta-cen ellipsis"
              }
              onClick={() => {
                selectNav(index);
              }}
            >
              <img src={item.icon} alt="icon" />
              <span style={{ flex: 1 }} className="zi" title={item.title}>
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        {list.map((item1, index1) => (
          <div className="pub nav_move_pub" key={item1._id} id={`nav_${index1}`}>
            <div className="title">
              <img className="mr-r-10" src={item1.icon} alt="icon" />
              {item1.title}
            </div>
            <div className="content">
              <ul>
                {item1.children.map((item2, index2) => (
                  <li
                    key={item2._id}
                    onClick={() => {
                      toBlank(item2.url);
                    }}
                  >
                    {imgErrIndexArr.includes(`${index1}-${index2}`) ?
                      <span className="icon">{item2.title.substring(0, 1)}</span>
                      : <img className="mr-r-10" src={item2.icon} alt="icon" onError={() => {
                        let data = JSON.parse(JSON.stringify(imgErrIndexArr));
                        data.push(`${index1}-${index2}`);
                        // console.log('data', data);
                        setImgErrIndexArr(data);
                      }} />}
                    <span>{item2.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="navToolBtn" onClick={() => showDrawer('left')}>
        <MenuOutlined />
      </div>
      <Drawer
        className="my-drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        width={'50%'}
        style={{ background: '#202529' }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <ul id="nav">
          {list.map((item, index) => (
            <li
              key={index}
              className={
                index === selectIdx
                  ? "nav-active fl-sta-cen ellipsis"
                  : "fl-sta-cen ellipsis"
              }
              onClick={() => {
                selectNav(index);
              }}
            >
              <img src={item.icon} alt="icon" />
              <span style={{ flex: 1 }} className="zi" title={item.title}>
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}
