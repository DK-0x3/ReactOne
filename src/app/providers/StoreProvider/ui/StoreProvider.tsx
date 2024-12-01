import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { IStateSchema } from 'app/providers/StoreProvider/config/IStateSchema';

interface IStoreProviderProps {
    children?: ReactNode;
	initialState?: IStateSchema;
}

export const StoreProvider = (props: IStoreProviderProps) => {
	const {
		children,
		initialState,
	} = props;

	const store = createReduxStore();

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
