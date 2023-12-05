import { Login } from '@js-camp/core/models/auth/login';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { login, resetAuthError } from '@js-camp/react/store/auth/dispatchers';
import { nameof } from '@js-camp/react/utils/nameof';
import { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Alert } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Loader } from '@js-camp/react/components/Loader/Loader';
import { selectAuth } from '@js-camp/react/store/auth/selectors';

import styles from './LoginPage.module.css';
import { LoginForm, loginSchema } from './LoginSchema';

/** Login page component. */
const LoginPageComponent = () => {
	const dispatch = useAppDispatch();
	const { isLoading, error: loginError } = useAppSelector(selectAuth);

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

	const loginFormNameof = nameof<LoginForm>();

	return (
		<div className={styles.loginFormContainer}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.loginForm}>
				<TextField
					label="Email"
					error={formErrors.email !== undefined}
					helperText={formErrors.email?.message}
					{...register(loginFormNameof('email'))} />
				<TextField
					type="password"
					label="Password"
					error={formErrors.password !== undefined}
					helperText={formErrors.password?.message}
					{...register(loginFormNameof('password'))} />
				<Loader isLoading={isLoading} />
				{loginError !== null && <Alert severity="error">{loginError.message}</Alert>}
				<Button type="submit">Sign in</Button>
				<Link
					to='/auth/registration'
					className={styles.loginForm__registrationLink}>
					Sign out
				</Link>
			</form>
		</div>
	);
};

LoginPageComponent.displayName = 'camp-login';

export const LoginPage = memo(LoginPageComponent);
