import { counterReducer, counterActions } from './counterSlice';
import { ICounterSchema } from 'entities/Counter';


describe('CounterSlice', () => {
	test('decrement счетчика', () => {
		const state: ICounterSchema = { value: 10 };

		expect(counterReducer(
			state,
			counterActions.decrement(),
		)).toEqual({ value: 9 });
	});

	test('increment счетчика', () => {
		const state: ICounterSchema = { value: 10 };

		expect(counterReducer(
			state,
			counterActions.increment(),
		)).toEqual({ value: 11 });
	});

	test('Проверяется работу при пустом state', () => {
		expect(counterReducer(
			undefined,
			counterActions.increment(),
		)).toEqual({ value: 1 });
	});
});
