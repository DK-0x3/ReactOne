import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './LoginModal.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../loginForm/LoginForm';

interface ILoginModalProps {
    className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: ILoginModalProps) => {
	return (
		<Modal
			className={classNames(cls.LoginModal, {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
		>
			<LoginForm/>
		</Modal>
	);
};
