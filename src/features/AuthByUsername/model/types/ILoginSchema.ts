import { LoginError } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';

export interface ILoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: LoginError;
}
