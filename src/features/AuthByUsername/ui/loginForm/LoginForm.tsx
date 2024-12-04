import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/input/Input';

interface ILoginFormProps {
    className?: string;
};

export const LoginForm = ({ className }: ILoginFormProps) => {
	const { t } = useTranslation();
    
	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<Input 
				className={cls.input}
				placeholder={t('Введите имя пользователя')}
				autoFocus={true}
			/>
			<Input 
				className={cls.input}
				placeholder={t('Введите пароль')}
			/>
			<Button
				className={cls.loginBtn}
			>
				{t('Войти')}
			</Button>
		</div>
	);
};
