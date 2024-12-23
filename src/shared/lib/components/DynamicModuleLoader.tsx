import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { IReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/IStateSchema';
import { useAppDispatch } from 'app/providers/StoreProvider/hook/useAppDispatch';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer;
}

type ReducerListEntry = [StateSchemaKey, Reducer];

interface IDynamicModuleLoaderProps extends PropsWithChildren {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<IDynamicModuleLoaderProps> = (props) => {
	const {
		children,
		reducers,
		removeAfterUnmount,
	} = props;

	const store = useStore() as IReduxStoreWithManager;
	const dispatch = useAppDispatch();

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
			store.reducerManager.add(name, reducer);
			dispatch({ type: `@INIT ${name} reducer` });
		});

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
					store.reducerManager.remove(name);
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
	}, []);

	return (
		<>
			{children}
		</>
	);
};