import React, { useState, useEffect } from "react";
import "./About.scss";
import { Timeline } from "antd";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx"; // jsx模式的包
import "ace-builds/src-noconflict/theme-monokai"; // monokai的主题样式
import "ace-builds/src-noconflict/ext-language_tools"; // 代码联想
import { getAboutList } from "@/api/front-api";

export default function About() {
  const [selectId, setSelectId] = useState(1);
  const [code, setCode] = useState("");

  const [list, setList] = useState([]);

  useEffect(() => {
    request();
  }, []);

  // 请求数据
  const request = async (params = {}) => {
    getAboutList(params).then((res) => {
      if (res.code === 200) {
        const { data } = res;
        setSelectId(data[0]._id);
        setCode(data[0].code);
        setList(data);
      }
    });
  };

  const selectTime = (item) => {
    setSelectId(item._id);
    setCode(item.code);
  };
  return (
    <div className="about">
      <div className="aside">
        <Timeline>
          {list.map((item) => (
            <Timeline.Item
              key={item._id}
              style={{ background: "transparent", color: "#f2f2f2" }}
              color={selectId === item._id ? "green" : "blue"}
            >
              <div
                className="year"
                onClick={() => {
                  selectTime(item);
                }}
              >
                {item.title}
              </div>
              <br />
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
      <div className="main">
        <AceEditor
          mode="jsx"
          theme="monokai"
          name="app_code_editor"
          fontSize={14}
          showPrintMargin
          height="100%"
          width="40%"
          showGutter
          onChange={(value) => {
            setCode(value); // 输出代码编辑器内值改变后的值
          }}
          value={code}
          wrapEnabled
          highlightActiveLine //突出活动线
          enableSnippets //启用代码段
          setOptions={{
            enableBasicAutocompletion: true, //启用基本自动完成功能
            enableLiveAutocompletion: true, //启用实时自动完成功能 （比如：智能代码提示）
            enableSnippets: true, //启用代码段
            showLineNumbers: true,
            tabSize: 2,
          }}
          annotations={[
            { row: 0, column: 2, type: "error", text: "Some error." },
          ]} // 错误，警告
        />
        <iframe
          srcDoc={code}
          title="result"
          style={{ height: "100%", width: "60%" }}
        ></iframe>
      </div>
    </div>
  );
}
