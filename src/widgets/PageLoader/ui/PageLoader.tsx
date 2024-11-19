import {classNames} from "shared/lib/classNames/classNames";
import  * as cls from "./PageLoader.module.scss";
import React from "react";
import {Loader} from "shared/ui/Loader/Loader";

interface IPageLoaderProps {
    className?: string;
}

export const PageLoader: React.FC<IPageLoaderProps> = ({ className }: IPageLoaderProps) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader/>
        </div>
    )
}
