import {classNames} from "shared/lib/classNames/classNames";
import "./Loader.scss";
import React from "react";

interface ILoaderProps {
    className?: string;
}

export const Loader: React.FC<ILoaderProps> = ({ className }: ILoaderProps) => {
    return (
        <div className={classNames('lds-grid', {}, [className])}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
        </div>
    )
};
