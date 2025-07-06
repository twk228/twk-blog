import { useState, useEffect } from 'react'
import MonacoEditor from 'react-monaco-editor';
import propTypes from "prop-types";

const Editor = (props) => {
    //值
    const [value, setValue] = useState(props.value);
    //渲染获取到的代码
    useEffect(() => {
        if (props.value) {
            setValue(props.value)
        }
    }, [props.value])
    //改变代码时触发
    const handleChange = (val) => {
        setValue(val)
        props.onChange(val)
    }

    const editorDidMount = (editor) => {
        // eslint-disable-next-line no-console
        console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
    };

    return (
        <>
            <MonacoEditor
                width={props.width}
                height={props.height}
                language={props.language}
                theme={props.theme}
                defaultValue={props.defaultValue}
                value={value}
                onChange={handleChange}
                options={props.options}
                editorDidMount={editorDidMount}
            >
            </MonacoEditor>
        </>

    )
}

Editor.propTypes = {
    width: propTypes.string,
    height: propTypes.string,
    language: propTypes.string,
    theme: propTypes.string,
    defaultValue: propTypes.string,
    value: propTypes.string,
    onChange: propTypes.func,
    options: propTypes.object
}

Editor.defaultProps = {
    width: '100%',
    height: '100%',
    language: 'html',
    theme: 'vs-dark',
    defaultValue: '{}',
    value: '{}',
    onChange: () => { },
    options: {
        readOnly: false, // 是否只读
        selectOnLineNumbers: true,
        matchBrackets: 'near'
    }
}

export default Editor;