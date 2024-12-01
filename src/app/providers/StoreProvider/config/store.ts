import { configureStore } from '@reduxjs/toolkit';
import { IStateSchema } from './IStateSchema';
import { counterReducer } from 'entities/Counter';

export  function  createReduxStore(initialState?: IStateSchema) {
	return configureStore<IStateSchema>({
		reducer: {
			counter: counterReducer,
		},
		devTools: __IS_DEV__,
	});
}
