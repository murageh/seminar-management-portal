import React from "react";

export const Card = ({children}: { children: React.ReactNode }) => (
    <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">{children}</div>
);
