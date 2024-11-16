import React from "react";
import classNames from "classnames";

type FloatingTextProps = {
    text: string;
    color?: string;
    opacity?: number;
    rotation?: number;
    top?: string;
    left?: string;
};

const FloatingText:
    React.FC<FloatingTextProps> = ({
                                       text,
                                       color = "white",
                                       opacity = 0.1,
                                       rotation = 0,
                                       top = "50%",
                                       left = "50%",
                                   }) => {
    return (
        <span
            className={classNames("absolute font-gothic text-9xl", {
                [`text-${color}`]: color,
            })}
            style={{
                opacity,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                top,
                left,
            }}
        >
            {text}
        </span>
    );
};

export default FloatingText;