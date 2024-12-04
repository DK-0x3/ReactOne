import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Navbar.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';

interface INavbarProps {
    className?: string;
}

export const Navbar = ({ className }: INavbarProps) => {
	const { t } = useTranslation();

	const [isAuthModal, setAuthModal] = useState(false);

	const onCloseModal = useCallback(() => {
		setAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setAuthModal(true);
	}, []);

	return (
		<div className={classNames(cls.Navbar, {}, [className])}>
			<div className={cls.links}>

				<Button
					theme={ThemeButton.CLEAR}
					className={cls.links}
					onClick={onShowModal}
				>
					{t('Войти')}
				</Button>

				<LoginModal
					isOpen={isAuthModal}
					onClose={onCloseModal}
				/>
			</div>
		</div>
	);
};
