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
import clsx from 'clsx';

import styles from './LoginPage.module.css';
import { LoginForm, defaultLoginForm, loginSchema } from './LoginSchema';

/** Login page component. */
const LoginPageComponent = () => {
	const dispatch = useAppDispatch();
	const { isLoading, error: loginError } = useAppSelector(selectAuth);

	const { register, handleSubmit, formState: { errors: formErrors } } = useForm({
		defaultValues: defaultLoginForm,
		resolver: yupResolver(loginSchema),
	});

	/**
	 * Handle login form submitting.
	 * @param loginForm - Login form.
	 */
	const onSubmit: SubmitHandler<LoginForm> = loginForm => {
		dispatch(login(loginForm));
	};

	useEffect(() => {
		return () => {
			dispatch(resetAuthError());
		};
	}, []);

	const loginFormNameof = nameof<LoginForm>();

	return (
		<div className={styles.loginFormContainer}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={clsx(
					styles.loginForm,
					styles.loginFormContainer__form,
				)}>
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
