import React from 'react';

const FullScreenLoader = () => {
    return (
        <div
            id={"sms-full-screen-loader"}
            className="transition-opacity fixed top-0 left-0 w-screen h-screen bg-blue-950/25 z-50 pointer-events-none flex justify-center items-center opacity-0"
        >
            <div className="loader animate-spin rounded-full border-8 border-t-8 border-b-blue-700 h-12 w-12"></div>
        </div>
    );
};

export const showFullScreenLoader = () => {
    const loader = document.getElementById("sms-full-screen-loader");
    if (loader) {
        loader.style.opacity = "1";
    }
}

export const hideFullScreenLoader = () => {
    const loader = document.getElementById("sms-full-screen-loader");
    if (loader) {
        loader.style.opacity = "0";
    }
}

export default FullScreenLoader;