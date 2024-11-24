import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface INavbarProps {
    className?: string;
}

export const Navbar = ({ className }: INavbarProps) => {
	const { t } = useTranslation();

	const [isAuthModal, setAuthModal] = useState(false);

	const onToggleModal = useCallback(() => {
		setAuthModal((prev) => !prev);
	}, []);

	return (
		<div className={classNames(cls.Navbar, {}, [className])}>
			<div className={cls.links}>

				<Button
					theme={ThemeButton.CLEAR}
					className={cls.links}
					onClick={onToggleModal}
				>
					{t('Войти')}
				</Button>

				<Modal isOpen={isAuthModal} onClose={onToggleModal}>
					{t('Авторизация')}
				</Modal>
			</div>
		</div>
	);
};
