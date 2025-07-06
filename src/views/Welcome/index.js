/*
 * @Author: tangweike twk22856@163.com
 * @Date: 2024-08-26 10:12:39
 * @LastEditors: tangweike twk22856@163.com
 * @LastEditTime: 2024-08-26 13:52:20
 * @FilePath: \my-demo\src\views\Welcome\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";
import "./index.scss";
import { Layout } from "antd";
// import { Typer } from "./Typer";
import { useNavigate } from "react-router-dom";
const WelcomeLayout = () => {
  const navigate = useNavigate();

  useEffect(()=>{
  })
  function redirect() {
    navigate("/front/about/index");
  }

  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <div className="welcome" onClick={redirect}>
        {/* 背景 */}
        {/* <img className="bg" src="https://s2.loli.net/2025/01/21/h1rMmD24cfQy7dO.jpg" alt="" /> */}
        {/* <Typer /> */}
        <div className="bird-container bird-container--one">
          <div className="bird bird--one"></div>
        </div>

        <div className="bird-container bird-container--two">
          <div className="bird bird--two"></div>
        </div>

        <div className="bird-container bird-container--three">
          <div className="bird bird--three"></div>
        </div>

        <div className="bird-container bird-container--four">
          <div className="bird bird--four"></div>
        </div>
      </div>
    </Layout>
  );
};
export default WelcomeLayout;
