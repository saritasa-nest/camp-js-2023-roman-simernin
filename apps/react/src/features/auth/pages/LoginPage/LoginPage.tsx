import { Login } from '@js-camp/core/models/auth/login';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { login, resetAuthError } from '@js-camp/react/store/auth/dispatchers';
import { selectAuthError, selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { nameof } from '@js-camp/react/utils/nameof';
import { FC, memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Alert } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { AuthenticationConstants } from '@js-camp/core/utils/authentication-constants';
import { Loader } from '@js-camp/react/components/Loader/Loader';

import styles from './LoginPage.module.css';

type LoginForm = Login;

const loginSchema: yup.ObjectSchema<LoginForm> = yup
	.object({
		email: yup.string()
			.required()
			.email(),
		password: yup.string()
			.required()
			.min(AuthenticationConstants.minPasswordLength),
	});

/** Login page component. */
const LoginPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsAuthLoading);
	const loginError = useAppSelector(selectAuthError);

	const defaultLoginData: LoginForm = {
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

	useEffect(() => {
		return () => {
			dispatch(resetAuthError());
		};
	}, [dispatch]);

	return (
		<div className={styles['login-form-container']}>
			<form onSubmit={handleSubmit(onSubmit)}
				className={styles['login-form']}>
				<TextField
					label="Email"
					error={formErrors.email !== undefined}
					helperText={formErrors.email?.message}
					{...register(nameof<LoginForm>('email'))}/>
				<TextField
					type="password"
					label="Password"
					error={formErrors.password !== undefined}
					helperText={formErrors.password?.message}
					{...register(nameof<LoginForm>('password'))}/>
				<Loader isLoading={isLoading}></Loader>
				{loginError !== null && <Alert severity="error">{loginError.message}</Alert>}
				<Button type="submit">Sign in</Button>
				<Link to='/auth/registration' className={styles['login-form__registration-link']}>Sign out</Link>
			</form>
		</div>
	);
};

export const LoginPage = memo(LoginPageComponent);
