'use client';

import { useEffect } from "react";

interface IMeta {
    title: string;
    children: any;
    className: string;
}

export const MetaData = ({ title, children, className, ...rest }: IMeta) => {
    useEffect(() => {
        if (title) document.title = title;
    }, [title]);
    return <div className={className}>{children}</div>;
};
