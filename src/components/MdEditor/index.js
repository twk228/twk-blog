import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import marked from './lib/helpers/marked';
import keydownListen from './lib/helpers/keydownListen';
import ToolbarLeft from './component/toolbar_left';
import ToolbarRight from './component/toolbar_right';
import { insertText } from './lib/helpers/function';
import 'highlight.js/styles/tomorrow.css';
import './lib/fonts/iconfont.css';
import './lib/css/index.scss';
import { CONFIG } from './lib';
import propTypes from "prop-types";
import { message } from "antd";


const MdEditor = (props) => {
    const [preview, setPreview] = useState(props.preview);
    const [expand, setExpand] = useState(props.expand);
    const [subfield, setSubfield] = useState(props.subfield);
    const [value, setValue] = useState(props.value);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [lineIndex, setLineIndex] = useState(1);
    const [words, setWords] = useState({});

    let $vm = React.createRef()
    let $scrollEdit = React.createRef()
    let $scrollPreview = React.createRef()
    let $blockEdit = React.createRef()
    let $blockPreview = React.createRef()

    useEffect(() => {
        let $dom = $vm.current;
        keydownListen($vm.current, (type) => {
            toolBarLeftClick(type, $dom)
        })
        reLineNum(value)
        initLanguage()
    }, [])

    useEffect(() => {
        reLineNum(props.value)
        if (props.value !== history[historyIndex]) {
            setValue(props.value)
            let currentTimeout = null
            if (currentTimeout) {
                window.clearTimeout(currentTimeout)
            }
            currentTimeout = window.setTimeout(() => {
                saveHistory(props.value)
            }, 500)
        }
        if (subfield !== props.subfield) {
            setSubfield(props.subfield);
        }
        if (preview !== props.preview) {
            setPreview(props.preview);
        }
        if (expand !== props.expand) {
            setExpand(props.expand);
        }
    }, [props.value, props.subfield, props.preview, props.expand])

    // 初始化语言
    const initLanguage = () => {
        const { language } = props;
        const lang = CONFIG.langList.indexOf(language) >= 0 ? language : 'zh-CN';
        setWords(CONFIG.language[lang])
    }

    // 输入框改变
    const handleChange = (e) => {
        const value = e.target.value
        setValue(value);
        props.onChange(value)
    }

    // 保存记录
    const saveHistory = (value) => {
        let historyIdx = historyIndex;
        // 撤销后修改，删除当前以后记录
        history.splice(historyIdx + 1, history.length)
        if (history.length >= 20) {
            history.shift()
        }
        // 记录当前位置
        historyIdx = history.length;
        history.push(value)
        setHistory(history);
        setHistoryIndex(historyIdx);
    }

    // 重新计算行号
    const reLineNum = (value) => {
        const lineIdx = value ? value.split('\n').length : 1;
        setLineIndex(lineIdx)
    }

    // 保存
    const save = ($dom) => {
        let $domCopy = $dom || $vm.current;
        if ($domCopy) {
            props.onSave($domCopy.value);
            message.success('保存成功');
        }
    }

    // 撤销
    const undo = () => {
        let historyIdx = historyIndex;
        historyIdx = historyIdx - 1
        if (historyIdx < 0) return
        setValue(history[historyIdx])
        props.onChange(history[historyIdx])
        setHistoryIndex(i => i - 1)
    }

    // 重做
    const redo = () => {
        let historyIdx = historyIndex;
        historyIdx = historyIdx + 1
        if (historyIdx >= history.length) return
        setValue(history[historyIdx])
        props.onChange(history[historyIdx])
        setHistoryIndex(historyIdx)
    }

    // 回车
    const enter = ($dom) => {
        if ($dom) {
            // 光标位置
            let cuersorIndex = getCursorPosition($dom);
            let value = $dom.value;
            // 截取光标前面的内容
            let startValue = value.substring(0, cuersorIndex);
            let startValueArr = startValue.split('\n');
            // 获取光标前面的最后一行的内容
            let startLastLine = startValueArr[startValueArr.length - 1];
            // 需要插入的内容
            let con = {
                prefix: `\n`,
                subfix: '',
                str: ''
            }
            if (Number(startLastLine.substring(0, 1))) { // 有序列表
                if (startLastLine.substring(3)) { // 有内容时插入下一项
                    con = {
                        prefix: `\n${String(Number(startLastLine.substring(0, 1)) + 1)}. `,
                        subfix: '',
                        str: ''
                    }
                    const value = insertText($dom, con)
                    setValue(value);
                    props.onChange(value)
                } else { // 无内容时清除当前项
                    let result = value.substring(0, cuersorIndex - 4) + value.substring(cuersorIndex, value.length)
                    setValue(result);
                    props.onChange(result)
                    setTimeout(() => {
                        setCaretPosition($dom, cuersorIndex - 3)
                    });
                }

            } else if (startLastLine.substring(0, 2) === '* ') { // 无序列表
                if (startLastLine.substring(3)) { // 有内容时插入下一项
                    con = {
                        prefix: `\n* `,
                        subfix: '',
                        str: ''
                    }
                    const value = insertText($dom, con)
                    setValue(value);
                    props.onChange(value)
                } else { // 无内容时清除当前项
                    let result = value.substring(0, cuersorIndex - 3) + value.substring(cuersorIndex, value.length)
                    setValue(result);
                    props.onChange(result)
                    setTimeout(() => {
                        setCaretPosition($dom, cuersorIndex - 2)
                    });
                }
            } else { // 普通回车
                const value = insertText($dom, con)
                setValue(value);
                props.onChange(value)
            }
        }
    }
    // 获取光标位置
    const getCursorPosition = (ctrl) => {
        var CaretPos = 0;
        if (document.selection) { // IE浏览器支持
            ctrl.focus();
            var Sel = document.selection.createRange();
            Sel.moveStart('character', -ctrl.value.length);
            CaretPos = Sel.text.length;
        } else if (ctrl.selectionStart || ctrl.selectionStart === '0') { // 非IE浏览器支持
            CaretPos = ctrl.selectionStart;
        }
        return CaretPos;
    }
    // 设置光标位置
    const setCaretPosition = (ctrl, posStart, posEnd) => {
        if (ctrl.setSelectionRange) { // 非IE浏览器支持
            ctrl.focus();
            if(posEnd){
                ctrl.setSelectionRange(posStart, posEnd);
            }else{
                ctrl.setSelectionRange(posStart, posStart);
            }
        } else if (ctrl.createTextRange) { // IE浏览器支持
            var range = ctrl.createTextRange();
            range.collapse(true);
            if(posEnd){
                range.moveEnd('character', posEnd);
            }else{
                range.moveEnd('character', posStart);
            }
            range.moveStart('character', posStart);
            range.select();
        }
    }

    // 菜单点击
    const toolBarLeftClick = (type, $dom) => {
        // 光标位置
        let cuersorIndex = getCursorPosition($vm.current || $dom);
        const insertTextObj = {
            B: {
                prefix: '**',
                subfix: '**',
                str: words.B
            },
            h1: {
                prefix: '# ',
                subfix: '',
                str: words.h1
            },
            h2: {
                prefix: '## ',
                subfix: '',
                str: words.h2
            },
            h3: {
                prefix: '### ',
                subfix: '',
                str: words.h3
            },
            h4: {
                prefix: '#### ',
                subfix: '',
                str: words.h4
            },
            ul: {
                prefix: '* ',
                subfix: '',
                str: words.ul
            },
            ol: {
                prefix: '1. ',
                subfix: '',
                str: words.ol
            },
            table: {
                prefix: `| 表头1 | 表头1 |
|--|--|
| 元素1 | 元素2 |`,
                subfix: '',
                str: ''
            },
            quote: {
                prefix: '> ',
                subfix: '',
                str: words.quote
            },
            img: {
                prefix: '![alt](',
                subfix: ')',
                str: 'url'
            },
            link: {
                prefix: '[添加链接描述](',
                subfix: ')',
                str: '添加链接地址url'
            },
            code: {
                prefix: '~~~js\n',
                subfix: '\n~~~',
                str: '添加代码片段'
            },
            tab: {
                prefix: '',
                subfix: '',
                str: ''
            }
        }

        if (insertTextObj.hasOwnProperty(type)) {
            let $dom2 = $vm.current;
            if ($vm.current) {
                const value = insertText($vm.current, insertTextObj[type])
                props.onChange(value)
                setTimeout(()=>{
                    setCaretPosition($dom2, cuersorIndex+(insertTextObj[type].prefix.length) , cuersorIndex+(insertTextObj[type].prefix.length + insertTextObj[type].str.length))
                },100)
            }
        }

        const otherLeftClick = {
            undo: undo,
            redo: redo,
            save: save,
            enter: enter,
        }
        if (otherLeftClick.hasOwnProperty(type)) {
            otherLeftClick[type]($dom)
        }
    }

    // 添加图片
    const addImg = (file, index) => {
        props.addImg(file, index)
    }

    // const $img2Url = (name, url) => {
    //     const value = insertText(this.$vm.current, {
    //         prefix: `![${name}](${url})`,
    //         subfix: '',
    //         str: ''
    //     })
    //     props.onChange(value)
    // }

    // 右侧菜单
    const toolBarRightClick = (type) => {
        const toolbarRightPreviewClick = () => {
            setPreview(!preview)
        }
        const toolbarRightExpandClick = () => {
            setExpand(!expand);
        }

        const toolbarRightSubfieldClick = () => {
            if (preview) {
                if (subfield) {
                    setSubfield(false);
                    setPreview(false);
                } else {
                    setSubfield(true);
                }
            } else {
                if (subfield) {
                    setSubfield(false);
                } else {
                    setSubfield(true);
                    setPreview(true);
                }
            }
        }

        const rightClick = {
            preview: toolbarRightPreviewClick,
            expand: toolbarRightExpandClick,
            subfield: toolbarRightSubfieldClick
        }
        if (rightClick.hasOwnProperty(type)) {
            rightClick[type]()
        }
    }

    const focusText = () => {
        $vm.current.focus()
    }

    const handleScoll = (e) => {
        const radio =
            $blockEdit.current.scrollTop /
            ($scrollEdit.current.scrollHeight - e.currentTarget.offsetHeight)
        $blockPreview.current.scrollTop =
            ($scrollPreview.current.scrollHeight - $blockPreview.current.offsetHeight) * radio
    }




    // 样式相关
    const editorClass = classNames({
        'for-editor-edit': true,
        'for-panel': true,
        'for-active': preview && subfield,
        'for-edit-preview': preview && !subfield
    })
    const previewClass = classNames({
        'for-panel': true,
        'for-editor-preview': true,
        'for-active': preview && subfield
    })
    const fullscreen = classNames({
        'for-container': true,
        'for-fullscreen': expand
    })
    const lineNumStyles = classNames({
        'for-line-num': true,
    })

    // 行号
    const lineNum = () => {
        const list = []
        for (let i = 0; i < lineIndex; i++) {
            list.push(<li key={i + 1}>{i + 1}</li>)
        }
        return (<ul className={lineNumStyles}>{list}</ul>)
    }

    return (
        <div className={fullscreen} style={{ height: props.height, ...props.style }}>
            {/* 菜单栏 */}
            {Boolean(Object.keys(props.toolbar).length) && (
                <div className="for-toolbar">
                    <ToolbarLeft
                        toolbar={props.toolbar}
                        words={words}
                        onClick={toolBarLeftClick}
                        addImg={addImg}
                    // {...props}
                    />
                    <ToolbarRight
                        toolbar={props.toolbar}
                        words={words}
                        preview={preview}
                        expand={expand}
                        subfield={subfield}
                        onClick={toolBarRightClick}
                    />
                </div>
            )}
            {/* 内容区 */}
            <div className="for-editor" style={{ fontSize: props.fontSize }}>
                {/* 编辑区 */}
                <div
                    className={editorClass}
                    ref={$blockEdit}
                    onScroll={handleScoll}
                    onClick={focusText}
                >
                    <div className="for-editor-block" ref={$scrollEdit}>
                        {lineNum()}
                        <div className="for-editor-content">
                            <pre>{value} </pre>
                            <textarea
                                ref={$vm}
                                value={value}
                                disabled={props.disabled}
                                onChange={handleChange}
                                placeholder={props.placeholder ? props.placeholder : words.placeholder}
                            />
                        </div>
                    </div>
                </div>
                {/* 预览区 */}
                <div className={previewClass} ref={$blockPreview}>
                    <div
                        ref={$scrollPreview}
                        className="for-preview for-markdown-preview"
                        dangerouslySetInnerHTML={{ __html: marked(value) }}
                    />
                </div>
            </div>
        </div>
    )
};

MdEditor.propTypes = {
    // 值
    value: propTypes.string,
    // 占位符
    placeholder: propTypes.string,
    // 改变事件
    onChange: propTypes.func,
    // 保存事件
    onSave: propTypes.func,
    // 添加图片事件
    addImg: propTypes.func,
    // 字体大小
    fontSize: propTypes.string,
    // 禁用编辑
    disabled: propTypes.bool,
    // 预览
    preview: propTypes.bool,
    // 全屏
    expand: propTypes.bool,
    // 双栏
    subfield: propTypes.bool,
    // 样式
    style: propTypes.object,
    // 高度
    height: propTypes.string,
    // 工具栏
    toolbar: propTypes.object,
    // 语言
    language: propTypes.string,
};

MdEditor.defaultProps = {
    onChange: () => { },
    onSave: () => { },
    addImg: () => { },
    fontSize: '14px',
    disabled: false,
    preview: false,
    expand: false,
    subfield: false,
    style: {},
    height: '',
    toolbar: CONFIG.toolbar,
    language: 'zh-CN'
}

export default MdEditor;
