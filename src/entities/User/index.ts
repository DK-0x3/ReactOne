import { userActions, userReducer } from 'entities/User/model/slice/userSlice';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export {
	userReducer,
	userActions
};

export {
	IUserSchema,
	IUser
} from './model/types/IUser';

export { getUserAuthData };
