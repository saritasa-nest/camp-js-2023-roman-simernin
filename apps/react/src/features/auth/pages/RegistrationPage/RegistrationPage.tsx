import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { nameof } from '@js-camp/react/utils/nameof';
import { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Alert } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Registration } from '@js-camp/core/models/auth/registration';
import { register, resetAuthError } from '@js-camp/react/store/auth/dispatchers';
import { Loader } from '@js-camp/react/components/Loader/Loader';
import { selectAuth } from '@js-camp/react/store/auth/selectors';

import styles from './RegistrationPage.module.css';
import { RegistrationForm, registrationSchema } from './RegistrationSchema';

/** Registration page component. */
const RegistrationPageComponent = () => {
	const dispatch = useAppDispatch();
	const { isLoading, error: registrationError } = useAppSelector(selectAuth);

	const defaultRegistrationForm: RegistrationForm = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		retypePassword: '',
	};

	const { register: formRegister, handleSubmit, formState: { errors: formErrors } } = useForm({
		defaultValues: defaultRegistrationForm,
		resolver: yupResolver(registrationSchema),
	});

	/**
	 * Handle registration form submitting.
		* @param registrationData - Registration data.
	 */
	const onSubmit: SubmitHandler<Registration> = registrationData => {
		dispatch(register(registrationData));
	};

	useEffect(() => {
		return () => {
			dispatch(resetAuthError());
		};
	}, [dispatch]);

	const registrationFormNameof = nameof<RegistrationForm>();

	return (
		<div className={styles.registrationFormContainer}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.registrationForm}>
				<TextField
					label="First name"
					error={formErrors.firstName !== undefined}
					helperText={formErrors.firstName?.message}
					{...formRegister(registrationFormNameof('firstName'))}/>
				<TextField
					label="Last name"
					error={formErrors.lastName !== undefined}
					helperText={formErrors.lastName?.message}
					{...formRegister(registrationFormNameof('lastName'))}/>
				<TextField
					label="Email"
					error={formErrors.email !== undefined}
					helperText={formErrors.email?.message}
					{...formRegister(registrationFormNameof('email'))}/>
				<TextField
					type="password"
					label="Password"
					error={formErrors.password !== undefined}
					helperText={formErrors.password?.message}
					{...formRegister(registrationFormNameof('password'))}/>
				<TextField
					type="password"
					label="Re-type password"
					error={formErrors.retypePassword !== undefined}
					helperText={formErrors.retypePassword?.message}
					{...formRegister(registrationFormNameof('retypePassword'))}/>
				<Loader isLoading={isLoading}></Loader>
				{registrationError !== null && <Alert severity="error">{registrationError.message}</Alert>}
				<Button type="submit">Sign out</Button>
				<Link
					to='/auth/login'
					className={styles.registrationForm__loginLink}>
						Sign in
				</Link>
			</form>
		</div>
	);
};

RegistrationPageComponent.displayName = 'camp-registration';

export const RegistrationPage = memo(RegistrationPageComponent);
