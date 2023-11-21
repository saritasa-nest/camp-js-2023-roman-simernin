import { Login } from '@js-camp/core/models/auth/login';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { login } from '@js-camp/react/store/auth/dispatchers';
import { selectAuthError, selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { nameof } from '@js-camp/react/utils/nameof';
import { FC, memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Alert } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './LoginPage.module.css';

const loginSchema: yup.ObjectSchema<Login> = yup
	.object({
		email: yup.string().required(),
		password: yup.string().required(),
	});

/** Login page component. */
const LoginPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const loginError = useAppSelector(selectAuthError);

	const defaultLoginData: Login = {
		email: '',
		password: '',
	};

	const { register, handleSubmit, formState: { errors: formErrors } } = useForm({
		defaultValues: defaultLoginData,
		resolver: yupResolver(loginSchema),
	});

	/**
	 * Handle login form submitting.
		* @param loginData - Login data.
	 */
	const onSubmit: SubmitHandler<Login> = loginData => {
		dispatch(login(loginData));
	};

	return (
		<div className={styles['login-form-container']}>
			<form onSubmit={handleSubmit(onSubmit)}
				className={styles['login-form']}>
				<TextField
					label="Email"
					error={formErrors.email !== undefined}
					helperText={formErrors.email?.message}
					{...register(nameof<Login>('email'))}/>
				<TextField
					type="password"
					label="Password"
					error={formErrors.password !== undefined}
					helperText={formErrors.password?.message}
					{...register(nameof<Login>('password'))}/>
				<Button type="submit">Sign in</Button>
				{loginError !== null && <Alert severity="error">{loginError.message}</Alert>}
			</form>
		</div>
	);
};

export const LoginPage = memo(LoginPageComponent);
