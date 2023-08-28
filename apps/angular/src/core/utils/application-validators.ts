import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export namespace ApplicationValidators {

	/**
	 * Validator for re-type value for password control.
	 * @param passwordControl - Control which should be re-typed.
	 * */
	export function retypePassword(passwordControl: AbstractControl): ValidatorFn {
		return (currentControl: AbstractControl): ValidationErrors | null => {
			if (currentControl.value === passwordControl.value) {
				return null;
			}

			return {
				...currentControl.errors,
				retype: 'Passwords do not match',
			};
		};
	}

	/** Validator for password min length. */
	export function passwordMinLength(): ValidatorFn {
		const minLength = 8;

		return Validators.minLength(minLength);
	}
}
