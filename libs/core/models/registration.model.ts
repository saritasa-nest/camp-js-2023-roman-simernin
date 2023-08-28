/** Model for registration. */
export interface RegistrationModel {

	/** First name. */
	readonly firstName: string;

	/** Last name. */
	readonly lastName: string;

	/** Email. */
	readonly email: string;

	/** Password. */
	readonly password: string;

	/** Confirm password. */
	readonly confirmPassword: string;
}
