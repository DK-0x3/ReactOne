import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Modal.module.scss';
import React, { useCallback, useEffect, useRef } from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';

interface IModalProps {
    className?: string;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: IModalProps) => {
	const {
		className,
		children,
		isOpen,
		onClose,
	} = props;

	const [isClosing, setIsClosing] = React.useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout>>();
	const { theme } = useTheme();

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onKeuDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeHandler();
		}
	}, [closeHandler]);

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeuDown);
		}

		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeuDown);
		};
	}, [isOpen, onKeuDown]);

	const mods: Record<string, boolean> = {
		[cls.opened]: isOpen,
		[cls.closing]: isClosing,
		[cls[theme]]: true,
	};

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className])}>
				<div className={cls.overlay} onClick={closeHandler}>
					<div className={cls.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
