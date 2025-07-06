import React, { useState } from "react";
import propTypes from "prop-types";

const Toolbars = (props) => {
    const [imgHidden, setImgHidden] = useState(true);
    const [imgList, setImgList] = useState([]);
    let timer = null;

    const onClick = (type) => {
        props.onClick(type)
    }

    // const imgClick = () => {
    //     setImgHidden(!imgHidden);
    // }

    const imgMouseOver = () => {
        window.clearTimeout(timer);
        setImgHidden(false);
    }

    const imgMouseOut = () => {
        timer = window.setTimeout(() => {
            setImgHidden(true);
        }, 150)
    }

    const addImgUrl = () => {
        props.onClick('img')
    }

    const addImgFile = (e) => {
        const index = imgList.length
        imgList.push(e.target.files[0])
        setImgList(imgList);
        props.addImg(e.target.files[0], index)
        e.target.value = ''
    }

    return (
        <ul>
            {props.toolbar.undo && (
                <li onClick={() => onClick('undo')} title={`${props.words.undo} (ctrl+z)`}>
                    <i className="foricon for-undo" />
                </li>
            )}
            {props.toolbar.redo && (
                <li onClick={() => onClick('redo')} title={`${props.words.redo} (ctrl+y)`}>
                    <i className="foricon for-redo" />
                </li>
            )}
            {props.toolbar.B && (
                <li onClick={() => onClick('B')} title={props.words.B}>
                    B
                </li>
            )}
            {props.toolbar.h1 && (
                <li onClick={() => onClick('h1')} title={props.words.h1}>
                    H1
                </li>
            )}
            {props.toolbar.h2 && (
                <li onClick={() => onClick('h2')} title={props.words.h2}>
                    H2
                </li>
            )}
            {props.toolbar.h3 && (
                <li onClick={() => onClick('h3')} title={props.words.h3}>
                    H3
                </li>
            )}
            {props.toolbar.h4 && (
                <li onClick={() => onClick('h4')} title={props.words.h4}>
                    H4
                </li>
            )}
            {props.toolbar.ul && (
                <li onClick={() => onClick('ul')} title={props.words.ul}>
                    <svg t="1737592836014" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7345" width="16" height="16"><path d="M96 800c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96z m928 32v128H384V832h640zM96 416c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96z m928 32v128H384V448h640zM96 32c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96z m928 32v128H384V64h640z" fill="#555555" p-id="7346"></path></svg>
                </li>
            )}
            {props.toolbar.ol && (
                <li onClick={() => onClick('ol')} title={props.words.ol}>
                    <svg t="1737592765694" className="icon" viewBox="0 0 1097 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6028" width="20" height="20"><path d="M341.66857156 243.40571469v-102.85714313h682.83428531v102.85714313H341.66857156z m1.85142844 345.94285687v-102.85714312h683.17714313v102.85714312H343.52z m-0.41142844 342.30857157v-102.85714313h681.80571375v102.85714313H343.10857156zM199.93142844 78.21714313v199.68h-55.2V147.06285689c-8.91428531 6.78857156-17.55428531 12.27428531-25.92 16.45714311s-18.78857156 8.22857156-31.40571375 12.06857156V130.74285687c18.51428531-5.96571469 32.98285687-13.16571469 43.2-21.53142843 10.28571469-8.43428531 18.37714311-18.78857156 24.13714218-31.06285688h45.18857157z m36 542.53714218H72.25142844c1.92-16.18285687 7.54285689-31.40571469 17.14285687-45.6 9.46285687-14.26285687 27.29142844-31.06285687 53.48571469-50.46857062 15.97714313-11.86285689 26.19428531-20.84571469 30.65142844-27.01714313a30.30857156 30.30857156 0 0 0 6.65142843-17.55428625 20.50285687 20.50285687 0 0 0-6.58285687-15.36 23.10857156 23.10857156 0 0 0-16.66285687-6.30857062 23.24571469 23.24571469 0 0 0-17.14285782 6.51428531c-4.38857156 4.38857156-7.33714311 12.13714313-8.91428531 23.17714313l-54.58285687-4.38857157c2.12571469-15.36 6.03428531-27.36 11.79428531-36a54.72 54.72 0 0 1 24.13714312-19.81714312c10.42285687-4.59428531 24.82285687-6.85714313 43.2-6.85714313 19.2 0 34.14857156 2.19428531 44.77714313 6.51428625a54.51428531 54.51428531 0 0 1 25.23428531 20.16c6.10285687 9.05142844 9.12 19.2 9.12 30.51428531a62.4 62.4 0 0 1-10.49142844 34.28571469c-6.99428531 10.90285687-19.74857156 22.83428531-38.19428625 35.86285688-10.97142844 7.54285689-18.37714311 12.89142844-22.08 15.97714312a201.80571469 201.80571469 0 0 0-13.02857062 11.86285688h85.16571375v44.50285687zM129.16571469 824l-51.56571469-9.25714313a64.73142844 64.73142844 0 0 1 24.68571469-37.71428531c12.20571469-8.84571469 29.48571469-13.16571469 51.84-13.16571469 25.57714311 0 44.09142844 4.8 55.54285687 14.33142844 11.45142844 9.53142844 17.14285687 21.53142844 17.14285688 36a40.25142844 40.25142844 0 0 1-6.92571375 23.04 59.17714313 59.17714313 0 0 1-21.05142938 18.10285782c7.54285689 1.85142844 13.37142844 4.04571469 17.41714313 6.51428531a42.51428531 42.51428531 0 0 1 15.22285687 15.90857156 48 48 0 0 1 5.41714313 23.52 65.48571469 65.48571469 0 0 1-8.98285688 32.91428531 60.13714313 60.13714313 0 0 1-25.85142843 24.20571469c-11.24571469 5.62285687-26.05714313 8.50285687-44.36571469 8.50285687-17.82857156 0-31.88571469-2.12571469-42.24-6.30857156a63.08571469 63.08571469 0 0 1-25.44-18.44571375 84.61714311 84.61714311 0 0 1-15.36-30.44571469l54.51428625-7.26857156c2.19428531 10.97142844 5.48571469 18.65142844 10.01142844 22.83428625 4.52571469 4.25142844 10.28571469 6.37714313 17.14285687 6.37714313 7.40571469 0 13.44-2.67428531 18.30857156-8.02285782a30.65142844 30.65142844 0 0 0 7.33714313-21.39428531 29.76 29.76 0 0 0-7.0628578-21.18857156 24.89142844 24.89142844 0 0 0-19.06285689-7.54285689c-4.25142844 0-10.14857156 1.09714313-17.69142844 3.22285689l2.81142844-38.94857156a52.11428531 52.11428531 0 0 0 7.13142844 0.68571467 24.89142844 24.89142844 0 0 0 17.82857156-6.85714311 21.66857156 21.66857156 0 0 0 7.2-16.18285689 19.33714313 19.33714313 0 0 0-5.34857156-14.4 19.88571469 19.88571469 0 0 0-14.74285688-5.28 21.6 21.6 0 0 0-15.70285687 5.82857158c-3.97714313 3.84-6.72 10.69714313-8.16 20.43428531z" fill="#555555" p-id="6029"></path></svg>
                </li>
            )}
            {props.toolbar.table && (
                <li onClick={() => onClick('table')} title={props.words.table}>
                    <svg t="1737592962349" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9403" width="16" height="16"><path d="M0 0h1024v256H0z" fill="#555555" p-id="9404"></path><path d="M0 0h64v1024H0z" fill="#555555" p-id="9405"></path><path d="M0 960h1024v64H0zM0 0h1024v64H0z" fill="#555555" p-id="9406"></path><path d="M960 0h64v1024h-64zM64 448h896v64H64z" fill="#555555" p-id="9407"></path><path d="M320 256h64v704H320zM640 256h64v704h-64z" fill="#555555" p-id="9408"></path><path d="M64 704h896v64H64z" fill="#555555" p-id="9409"></path></svg>
                </li>
            )}
            {props.toolbar.quote && (
                <li onClick={() => onClick('quote')} title={props.words.quote}>
                    <svg t="1737535370960" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2740" width="16" height="16"><path d="M800.768 477.184c-14.336 0-30.72 2.048-45.056 4.096 18.432-51.2 77.824-188.416 237.568-315.392 36.864-28.672-20.48-86.016-59.392-57.344-155.648 116.736-356.352 317.44-356.352 573.44v20.48c0 122.88 100.352 223.232 223.232 223.232S1024 825.344 1024 702.464c0-124.928-100.352-225.28-223.232-225.28zM223.232 477.184c-14.336 0-30.72 2.048-45.056 4.096 18.432-51.2 77.824-188.416 237.568-315.392 36.864-28.672-20.48-86.016-59.392-57.344C200.704 225.28 0 425.984 0 681.984v20.48c0 122.88 100.352 223.232 223.232 223.232s223.232-100.352 223.232-223.232c0-124.928-100.352-225.28-223.232-225.28z" fill="#555555" p-id="2741"></path></svg>
                </li>
            )}
            {props.toolbar.img && (
                <li className="for-toolbar-img" onMouseOver={() => imgMouseOver()} onMouseOut={() => imgMouseOut()}>
                    <i className="foricon for-image" />
                    <ul style={imgHidden ? { display: 'none' } : {}}>
                        <li onClick={() => addImgUrl()}>{props.words.addImgLink}</li>
                        <li>
                            {props.words.addImg}
                            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" onChange={(e) => addImgFile(e)} />
                        </li>
                    </ul>
                </li>
            )}
            {props.toolbar.link && (
                <li onClick={() => onClick('link')} title={props.words.link}>
                    <i className="foricon for-link" />
                </li>
            )}
            {props.toolbar.code && (
                <li onClick={() => onClick('code')} title={props.words.code}>
                    <i className="foricon for-code" />
                </li>
            )}
            {props.toolbar.save && (
                <li onClick={() => onClick('save')} title={`${props.words.save} (ctrl+s)`}>
                    <i className="foricon for-save" />
                </li>
            )}
        </ul>
    )
};

Toolbars.propTypes = {
    onClick: propTypes.func,
    toolbar: propTypes.object,
    words: propTypes.object
}

Toolbars.defaultProps = {
    onClick: () => { },
    toolbar: {},
    words: {}
}

export default Toolbars;


