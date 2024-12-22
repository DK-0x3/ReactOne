import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense } from 'react';
import { LoginFormAsync } from '../loginForm/LoginForm.async';
import { Loader } from 'shared/ui/Loader/Loader';

interface ILoginModalProps {
    className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: ILoginModalProps) => {
	return (
		<Modal
			className={classNames('', {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
		>
			<Suspense fallback={<Loader/>}>
				<LoginFormAsync/>
			</Suspense>
		</Modal>
	);
};
