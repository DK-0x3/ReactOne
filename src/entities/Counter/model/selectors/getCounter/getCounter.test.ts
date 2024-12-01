import { getCounter } from './getCounter';
import { IStateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';

describe('getCounter', () => {
	test('Возвращает корректное значение', () => {
		const state: DeepPartial<IStateSchema> = {
			counter: { value: 10 },
		};
		expect(getCounter(state as IStateSchema)).toEqual({ value: 10 });
	});
});
