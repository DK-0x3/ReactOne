import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/input/Input';
import { useSelector, useStore } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { loginActions, loginReducer } from '../../model/slice/LoginSlice';
import { loginByUsername, LoginError } from '../../model/services/loginByUsername/loginByUsername';
import { useAppDispatch } from 'app/providers/StoreProvider/hook/useAppDispatch';
import { ITextTheme, Text } from 'shared/ui/Text/Text';
import { IReduxStoreWithManager } from 'app/providers/StoreProvider/config/IStateSchema';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';

export interface ILoginFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

// eslint-disable-next-line react/display-name
const LoginForm = memo(({ className }: ILoginFormProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	const onChangeUsername = useCallback((value: string) => {
		dispatch(loginActions.setUsername(value));
	}, [dispatch]);

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value));
	}, [dispatch]);

	const onLoginClick = useCallback(() => {
		dispatch(loginByUsername({ username, password }));
	}, [dispatch, username, password]);

	let errorMessage = null;
	if (error === LoginError.ERROR_PASSWORD_OR_USERNAME) {
		errorMessage = 'Неверный логин или пароль';
	} else if (error === LoginError.INTERNAL_SERVER_ERROR) {
		errorMessage = 'Ошибка сервера попробуйте позже';
	}

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount={true}
		>
			<div className={classNames(cls.LoginForm, {}, [className])}>
				<Text title={t('Авторизация')}/>
				{errorMessage && <Text text={errorMessage} theme={ITextTheme.ERROR}/>}
				<Input
					className={cls.input}
					placeholder={t('Введите имя пользователя')}
					autoFocus={true}
					onChange={onChangeUsername}
					value={username}
				/>
				<Input
					className={cls.input}
					placeholder={t('Введите пароль')}
					onChange={onChangePassword}
					value={password}
				/>
				<Button
					theme={ThemeButton.OUTLINE}
					className={cls.loginBtn}
					onClick={onLoginClick}
					disabled={isLoading}
				>
					{t('Войти')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
