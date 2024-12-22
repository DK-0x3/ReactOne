import { AnyAction, combineReducers, Reducer, ReducersMapObject, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { IStateSchema, IReducerManager, StateSchemaKey } from './IStateSchema';

export function createReducerManager(initialReducers: ReducersMapObject<IStateSchema>): IReducerManager {
	const reducers = { ...initialReducers };

	let combinedReducer = combineReducers(reducers);

	let keysToRemove: Array<StateSchemaKey> = [];

	return {
		getReducerMap: () => reducers,

		reduce: (state: IStateSchema, action: AnyAction) => {
			if (keysToRemove.length > 0) {
				state = { ...state };
				for (let key of keysToRemove) {
					delete state[key];
				}
				keysToRemove = [];
			}
			return combinedReducer(state, action);
		},
		add: (key: StateSchemaKey, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return;
			}

			reducers[key] = reducer;

			combinedReducer = combineReducers(reducers);
		},
		remove: (key: StateSchemaKey) => {
			if (!key || !reducers[key]) {
				return;
			}

			delete reducers[key];

			keysToRemove.push(key);

			combinedReducer = combineReducers(reducers);
		}
	};
}