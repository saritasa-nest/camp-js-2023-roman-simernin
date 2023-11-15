import { Login } from '@js-camp/core/models/auth/login';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { login } from '@js-camp/react/store/auth/dispatchers';
import { selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { nameof } from '@js-camp/react/utils/nameof';
import { FC, memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

import styles from './LoginPage.module.css';

/** Login page component. */
const LoginPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsAuthLoading);

	const defaultLoginData: Login = {
		email: '',
		password: '',
	};

	const { register, handleSubmit } = useForm({
		defaultValues: defaultLoginData,
	});

	/**
	 * Handle login form submitting.
		* @param loginData - Login data.
	 */
	const onSubmit: SubmitHandler<Login> = loginData => {
		dispatch(login(loginData));
	};

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div className={styles['login-form-container']}>
			<form onSubmit={handleSubmit(onSubmit)}
				className={styles['login-form']}>
				<TextField
					label="Email"
					{...register(nameof<Login>('email'))}/>
				<TextField
					type="password"
					label="Password"
					{...register(nameof<Login>('password'))}/>
				<Button type="submit">Sign in</Button>
			</form>
		</div>
	);
};

export const LoginPage = memo(LoginPageComponent);
