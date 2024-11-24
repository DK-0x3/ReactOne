import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';

export enum ThemeButton {
    CLEAR = 'clear',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
	square?: boolean;
	size?: ButtonSize;
}

export const Button: FC<IButtonProps> = (props) => {
	const {
		className,
		children,
		theme,
		square,
		size = ButtonSize.M,
		...otherProps
	} = props;

	const mods: Record<string, boolean> = {
		[cls[theme]]: true,
		[cls.square]: square,
		[cls[size]]: true,
	};

	return (
		<button className={classNames(cls.Button, mods, [className])}
			{...otherProps}
		>
			{children}
		</button>
	);
};
