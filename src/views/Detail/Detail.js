import React, { useEffect, useState } from "react";
import "./Detail.scss";
import Footer from "../Footer/Footer";
import { useSearchParams } from "react-router-dom";
import { Flex, Tag } from "antd";
// import { projectList } from '../Home/mock';
// 文章显示
import ReactMarkdown from 'react-markdown';
// 划线、表、任务列表和直接url等的语法扩展
import remarkGfm from 'remark-gfm';
// 解析标签，支持html语法
import rehypeRaw from 'rehype-raw';
// 代码高亮
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 高亮的主题
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '@/assets/githubMarkdown.css';
import { DownOutlined, SnippetsOutlined } from '@ant-design/icons';
import { getProjectData } from "@/api/front-api";

// 代码高亮组件
function CodeRender({ node, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '')
  // 定义是否折叠代码变量
  let [isShowCode, setIsShowCode] = useState(true);
  // 定义是否复制代码变量
  let [isShowCopy, setIsShowCopy] = useState(false);
  let [copyTip, setCopyTip] = useState('');
  // 复制代码到剪切板
  const copyCodeToClipboard = (text) => {
    // 使用Clipboard API的writeText方法复制文本到剪贴板
    navigator.clipboard.writeText(text).then(function () {
      setCopyTip("复制成功");
      setIsShowCopy(true);
      setTimeout(() => {
        setIsShowCopy(false);
      }, 3000);
    }).catch(function (err) {
      setCopyTip("复制失败,请重试");
      setIsShowCopy(true);
      setTimeout(() => {
        setIsShowCopy(false);
      }, 3000);
    });
  }

  return !inline && match ? (
    <div className="code-wrapper">
      {/* 代码头部 */}
      <div className="code-header">
        <div>{match && match[1]}</div>
        <div
          className="preview-code-copy"
          onClick={() => {
            copyCodeToClipboard(String(children));
          }}
        >
          {isShowCopy && <span className="opacity-0-1-0 copy-success">{copyTip}</span>}
          <SnippetsOutlined />
        </div>
        <div
          style={{ cursor: "pointer", marginRight: "10px", transformOrigin: "8px" }}
          className={isShowCode ? "code-rotate-down" : "code-rotate-right"}
          onClick={() => setIsShowCode(!isShowCode)}
        >
          <DownOutlined />
        </div>
      </div>
      {isShowCode && (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={coldarkDark}
          language={match[1]}
          PreTag="div"
          showLineNumbers={true}
          {...props}
        />
      )}
    </div>
  ) : (
    <code className={className} {...props} children={children} />
  )
}

export default function Detail() {
  const [searchParams] = useSearchParams();
  const [detailObj, setDetailObj] = useState({});
  const tagColorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];


  const getDetailData = async (id) => {
    const res = await getProjectData({ id });
    if (res.code === 200) {
      setDetailObj(res.data);
    }
  }

  useEffect(() => {
    document.documentElement.scrollTop = 0
    let id = searchParams.get("id");
    getDetailData(id);
  }, [searchParams]);

  return (
    <div className="detail">
      {/* 头部 */}
      <div className="detail_header">
        {/* 文字 */}
        <div className="detail_text">
          <div className="text_title">{detailObj.title}</div>
          <Flex gap="4px 0" wrap="wrap">
            {detailObj.tagList && detailObj.tagList.map((item, index) => {
              return <Tag color={tagColorList[Math.floor(Math.random()*(tagColorList.length-1))]} key={index}>{item}</Tag>
            })
            }
          </Flex>
        </div>
      </div>
      {/* 中间 */}
      <div className="detail_main">
        <div className="left-section">
          <ReactMarkdown
            // 使用github-markdown-css样式的话className必须是markdown-body
            className='markdown-body'
            // // 插件及选项，singleTilde: false表示单波浪线也可以作为擦除线，但我设置true或false都没变化
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // 代码高亮
              code({ node, inline, className, children, ...props }) {
                return CodeRender({ node, inline, className, children, ...props });
              }
            }}
          >{detailObj.mdContent}</ReactMarkdown>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
