import {useTranslation} from 'react-i18next';
import React from 'react';
import {Button, ThemeButton} from 'shared/ui/Button/Button';
import {classNames} from 'shared/lib/classNames/classNames';
import * as cls from './LangSwitcher.module.scss'

interface ILangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({className}: ILangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	}

	return (
		<Button
			className={classNames(cls.LangSwitcher, {}, [className])}
			theme={ThemeButton.CLEAR}
			onClick={toggle}
		>
			{t('Язык')}
		</Button>
	)
};
