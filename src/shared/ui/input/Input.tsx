import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Input.module.scss';
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface IInputProps extends HTMLInputProps {
    className?: string;
	value?: string;
	onChange?: (value: string) => void;
};

// eslint-disable-next-line react/display-name
export const Input = memo((props: IInputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'test',
		placeholder,
		autoFocus,
		...otherProps
	} = props;
	const ref = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);

	useEffect(() => {
		if(autoFocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autoFocus]);

	const calculateCaretPosition = (value: string) => {
		const span = document.createElement('span');

		// Скопировать стиль шрифта из input в span
		span.style.whiteSpace = 'pre'; // Для сохранения пробелов
		span.style.position = 'absolute';
		span.style.visibility = 'hidden';

		// Вставляем символы из input в span
		span.textContent = value;

		// Добавляем span в body
		document.body.appendChild(span);

		// Получаем ширину текста
		const textWidth = span.offsetWidth;

		// Удаляем span после измерений
		document.body.removeChild(span);

		return textWidth;
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const onFocus = () => {
		setIsFocused(true);
	};

	// eslint-disable-next-line
	const onSelect = (e: any) => {
		const selectionStart = e?.target?.selectionStart;
		const value = e?.target?.value.substring(0, selectionStart);

		if (calculateCaretPosition(value) < ref.current.offsetWidth) {
			setCaretPosition(calculateCaretPosition(value));
		}
	};
	
	return (
		<div className={classNames(cls.InputWrapper, {}, [className])}>
			{placeholder && (
				<div className={cls.placeholder}>
					{`${placeholder}>`}
				</div>
			)}
			<div className={cls.caretWrapper}>
				<input
					ref={ref}
					type={type}
					value={value}
					onChange={onChangeHandler}
					className={cls.input}
					onFocus={onFocus}
					onBlur={onBlur}
					onSelect={onSelect}
					{...otherProps}
				/>
				{isFocused && (
					<span
						className={cls.caret}
						style={{ left: `${caretPosition}px` }}
					/>
				)}
			</div>
		</div>
	);
});
