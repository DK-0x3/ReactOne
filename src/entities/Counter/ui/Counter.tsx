import { Button } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useTranslation } from 'react-i18next';

interface ICounterProps {
    className?: string;
}

export const Counter = ({ className }: ICounterProps) => {
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const counterValue = useSelector(getCounterValue);

	const increment = () => {
		dispatch(counterActions.increment());
	};

	const decrement = () => {
		dispatch(counterActions.decrement());
	};
    
	return (
		<div>
			<h1>{t('value')} = {counterValue}</h1>
			<Button onClick={increment}>
				{t('increment')}
			</Button>
			<Button onClick={decrement}>
				{t('decrement')}
			</Button>
		</div>
	);
};
