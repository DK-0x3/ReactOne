import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Navbar.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';

interface INavbarProps {
    className?: string;
}

export const Navbar = ({ className }: INavbarProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [isAuthModal, setAuthModal] = useState(false);
	const authData = useSelector(getUserAuthData);

	const onCloseModal = useCallback(() => {
		setAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setAuthModal(true);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
		setAuthModal(false);
	}, [dispatch]);

	if (authData) {
		return (
			<div className={classNames(cls.Navbar, {}, [className])}>
				<div className={cls.links}>
					<Button
						theme={ThemeButton.CLEAR}
						className={cls.links}
						onClick={onLogout}
					>
						{t('Выйти')}
					</Button>
				</div>
			</div>
		);
	}
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

				{isAuthModal && <LoginModal
					isOpen={isAuthModal}
					onClose={onCloseModal}
				/>}
			</div>
		</div>
	);
};
