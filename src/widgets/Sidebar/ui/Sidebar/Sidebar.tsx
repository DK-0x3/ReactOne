import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Sidebar.module.scss';
import React, { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';

interface ISidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: ISidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const onToggle = () => {
		setCollapsed(prev => !prev);
	};

	const { t } = useTranslation();

	return (
		<div
			className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<Button
				onClick={onToggle}
				className={cls.collapseBtn}
				theme={ThemeButton.BACKGROUND_INVERTED}
				square={true}
				size={ButtonSize.L}
			>
				{collapsed ? '<' : '>'}
			</Button>

			<div className={cls.items}>
				<div>
					<AppLink
						theme={AppLinkTheme.SECONDARY}
						to={RoutePath.main}
						className={cls.item}
					>
						<MainIcon className={cls.icon}/>
						<span className={cls.link}>
							{t('Главная')}
						</span>
					</AppLink>
				</div>

				<div>
					<AppLink
						theme={AppLinkTheme.SECONDARY}
						to={RoutePath.about}
						className={cls.item}
					>
						<AboutIcon className={cls.icon}/>
						<span className={cls.link}>
							{t('О сайте')}
						</span>
					</AppLink>
				</div>
			</div>

			<div className={cls.switchers}>
				<ThemeSwitcher/>
				<LangSwitcher className={cls.lang} short={collapsed}/>
			</div>
		</div>
	);
};
