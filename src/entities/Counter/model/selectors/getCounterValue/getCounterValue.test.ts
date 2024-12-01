import { DeepPartial } from 'utility-types';
import { IStateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
	test('Возвращает корректное значение', () => {
		const state: DeepPartial<IStateSchema> = {
			counter: { value: 10 },
		};
		expect(getCounterValue(state as IStateSchema)).toEqual(10);
	});
});
