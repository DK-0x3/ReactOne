import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import type { IStateSchema, IReduxStoreWithManager } from './config/IStateSchema';

export { 
	StoreProvider,
	createReduxStore,
	IStateSchema,
};
