import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Text.module.scss';

export enum ITextTheme {
    PRIMARY = 'primary_text',
    ERROR = 'error_text',
}

interface ITextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: ITextTheme;
}

export const Text = (props: ITextProps) => {
	const {
		className,
		title,
		text,
		theme = ITextTheme.PRIMARY,
	} = props;
    
	return (
		<div className={classNames(cls.Text, { [cls[theme]]: true }, [className])}>
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
};
