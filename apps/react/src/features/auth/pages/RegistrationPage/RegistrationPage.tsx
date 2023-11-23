import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAuthError } from '@js-camp/react/store/auth/selectors';
import { nameof } from '@js-camp/react/utils/nameof';
import { FC, memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Alert } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Registration } from '@js-camp/core/models/auth/registration';
import { register, resetAuthError } from '@js-camp/react/store/auth/dispatchers';
import { AuthenticationConstants } from '@js-camp/core/utils/authentication-constants';

import styles from './RegistrationPage.module.css';

type RegistrationForm = Registration & {
	readonly retypePassword: string;
};

const registrationSchema: yup.ObjectSchema<RegistrationForm> = yup
	.object({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		email: yup.string()
			.required()
			.email(),
		password: yup.string()
			.required()
			.min(AuthenticationConstants.minPasswordLength),
		retypePassword: yup.string().required()
			.test('retype-password', 'Passwords do not match.', function() {
				const { password, retypePassword } = this.parent;
				return password === retypePassword;
			}),
	});

/** Registration page component. */
const RegistrationPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const registrationError = useAppSelector(selectAuthError);

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
	}, []);

	return (
		<div className={styles['registration-form-container']}>
			<form onSubmit={handleSubmit(onSubmit)}
				className={styles['registration-form']}>
				<TextField
					label="First name"
					error={formErrors.firstName !== undefined}
					helperText={formErrors.firstName?.message}
					{...formRegister(nameof<RegistrationForm>('firstName'))}/>
				<TextField
					label="Last name"
					error={formErrors.lastName !== undefined}
					helperText={formErrors.lastName?.message}
					{...formRegister(nameof<RegistrationForm>('lastName'))}/>
				<TextField
					label="Email"
					error={formErrors.email !== undefined}
					helperText={formErrors.email?.message}
					{...formRegister(nameof<RegistrationForm>('email'))}/>
				<TextField
					type="password"
					label="Password"
					error={formErrors.password !== undefined}
					helperText={formErrors.password?.message}
					{...formRegister(nameof<RegistrationForm>('password'))}/>
				<TextField
					type="password"
					label="Re-type password"
					error={formErrors.retypePassword !== undefined}
					helperText={formErrors.retypePassword?.message}
					{...formRegister(nameof<RegistrationForm>('retypePassword'))}/>
				{registrationError !== null && <Alert severity="error">{registrationError.message}</Alert>}
				<Button type="submit">Sign out</Button>
				<Link to='/auth/login' className={styles['registration-form__login-link']}>Sign in</Link>
			</form>
		</div>
	);
};

export const RegistrationPage = memo(RegistrationPageComponent);
