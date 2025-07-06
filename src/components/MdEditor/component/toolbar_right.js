import React from "react";
import classNames from 'classnames'
import propTypes from "prop-types";

const Toolbars = (props) => {
    const previewActive = classNames({
        'for-active': props.preview
    })
    const expandActive = classNames({
        'for-active': props.expand
    })
    const subfieldActive = classNames({
        'for-active': props.subfield
    })

    const onClick = (type) => {
        props.onClick(type)
    }

    return (
        <ul>
            {props.toolbar.expand && (
                <li
                    className={expandActive}
                    onClick={() => onClick('expand')}
                    title={expandActive ? props.words.fullscreenOff : props.words.fullscreenOn}
                >
                    {expandActive ? (
                        <i className="foricon for-contract" />
                    ) : (
                        <i className="foricon for-expand" />
                    )}
                </li>
            )}
            {props.toolbar.preview && (
                <li
                    className={previewActive}
                    onClick={() => onClick('preview')}
                    title={props.words.preview}
                >
                    {previewActive ? (
                        <i className="foricon for-eye-off" />
                    ) : (
                        <i className="foricon for-eye" />
                    )}
                </li>
            )}
            {props.toolbar.subfield && (
                <li
                    className={subfieldActive}
                    onClick={() => onClick('subfield')}
                    title={subfieldActive ? props.words.singleColumn : props.words.doubleColumn}
                >
                    <i className="foricon for-subfield" />
                </li>
            )}
        </ul>
    )
};

Toolbars.propTypes = {
    preview: propTypes.bool,
    expand: propTypes.bool,
    subfield: propTypes.bool,
    onClick: propTypes.func,
    toolbar: propTypes.object,
    words: propTypes.object
}

Toolbars.defaultProps = {
    preview: false,
    expand: false,
    subfield: false,
    onClick: () => { },
    toolbar: {},
    words: {}
}

export default Toolbars;


