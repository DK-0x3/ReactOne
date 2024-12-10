import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser, userActions } from 'entities/User';
import i18n from 'shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface ILoginByUsernameProps {
	username: string;
	password: string;
}

export enum LoginError {
	INTERNAL_SERVER_ERROR = 'NOT_FOUND',
	ERROR_PASSWORD_OR_USERNAME = 'ERROR_PASSWORD_OR_USERNAME',
	UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export const loginByUsername = createAsyncThunk<IUser, ILoginByUsernameProps, { rejectValue: LoginError }>(
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		try {
			const response = await axios.post<IUser>('http://localhost:8000/login', authData);
			if (!response.data) {
				return thunkAPI.rejectWithValue(LoginError.ERROR_PASSWORD_OR_USERNAME);
			}

			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
			thunkAPI.dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (e) {
			// Проверяем наличие ответа в ошибке
			if (axios.isAxiosError(e) && e.response) {
				const status = e.response.status;

				if (status === 403) {
					return thunkAPI.rejectWithValue(LoginError.ERROR_PASSWORD_OR_USERNAME);
				}

				// Обработка других статус-кодов
				if (status === 500) {
					return thunkAPI.rejectWithValue(LoginError.INTERNAL_SERVER_ERROR);
				}

				// Общая ошибка для остальных кодов
				return thunkAPI.rejectWithValue(LoginError.UNKNOWN_ERROR);
			}

			// Если ошибка не от axios
			console.error(e);
			return thunkAPI.rejectWithValue(LoginError.INTERNAL_SERVER_ERROR);
		}
	}
);
