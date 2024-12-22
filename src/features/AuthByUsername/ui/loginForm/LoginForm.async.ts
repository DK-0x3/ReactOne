import { FC, lazy } from 'react';
import { ILoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<ILoginFormProps>>(() => new Promise((resolve) => {
	setTimeout(() => resolve(import('./LoginForm')), 2200);
})
);
