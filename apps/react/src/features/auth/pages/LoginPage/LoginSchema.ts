import { Login } from '@js-camp/core/models/auth/login';
import { AuthenticationConstants } from '@js-camp/core/utils/authentication-constants';
import * as yup from 'yup';

/** Login form. */
export type LoginForm = Login;

export const defaultLoginForm: LoginForm = {
	email: '',
	password: '',
};

/** Login schema. */
export const loginSchema: yup.ObjectSchema<LoginForm> = yup.object({
	email: yup.string().required()
		.email(),
	password: yup.string().required()
		.min(AuthenticationConstants.minPasswordLength),
});
