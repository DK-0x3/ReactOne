import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';

interface ILangSwitcherProps {
    className?: string;
	short?: boolean;
}

export const LangSwitcher = ({ className, short }: ILangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button
			className={classNames('', {}, [className])}
			theme={ThemeButton.CLEAR}
			onClick={toggle}
		>
			{t(short ? 'Короткий язык' : 'Язык')}
		</Button>
	);
};
