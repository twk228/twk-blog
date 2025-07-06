import React, { forwardRef, useEffect, useState } from "react";
import propTypes from "prop-types";
import lottie from "lottie-web";

const LottieCom = forwardRef((props, ref) => {
    const lottieBoxRef = React.useRef(null);
    const [animation] = useState(null);

    useEffect(() => {
        if (lottieBoxRef.current) {
            lottie.loadAnimation({
                container: lottieBoxRef.current,
                renderer: "svg", // 渲染方式:svg：支持交互、不会失帧、canvas、html：支持3D，支持交互
                loop: true, // 循环播放，默认：true
                autoplay: true, // 自动播放 ，默认true
                path: props.path || '', //网络路径
                animationData: props.src || '', //本地路径，优先级更高
            });
        }
    }, [animation, props.path, props.src])

    return (<div className="lottieBox" ref={lottieBoxRef}></div>);
});

LottieCom.propTypes = {
    // 文件地址
    src: propTypes.object,
    // 网络路径
    path: propTypes.string,
};

export default LottieCom;
