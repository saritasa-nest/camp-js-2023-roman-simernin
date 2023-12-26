import { Registration } from '@js-camp/core/models/auth/registration';
import { AuthenticationConstants } from '@js-camp/core/utils/authentication-constants';
import * as yup from 'yup';

export type RegistrationForm = Registration & {
	readonly retypePassword: string;
};

export const defaultRegistrationForm: RegistrationForm = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	retypePassword: '',
};

export const registrationSchema: yup.ObjectSchema<RegistrationForm> = yup.object({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().required()
		.email(),
	password: yup.string().required()
		.min(AuthenticationConstants.minPasswordLength),
	retypePassword: yup
		.string()
		.required()
		.test('retype-password', 'Passwords do not match.', function() {
			const { password, retypePassword } = this.parent;
			return password === retypePassword;
		}),
});
