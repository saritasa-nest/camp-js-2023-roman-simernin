import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { ApplicationValidators } from '@js-camp/angular/core/utils/application-validators';
import { catchApiError } from '@js-camp/angular/core/utils/rxjs/catch-api-error';
import { ApiError } from '@js-camp/core/models/api-error';
import { AuthenticationConstants } from '@js-camp/core/utils/authentication-constants';
import { first, of, tap } from 'rxjs';

/** Registration form controls. */
interface RegistrationFormControls {

	/** First name form control. */
	firstName: FormControl<string>;

	/** Last name form control. */
	lastName: FormControl<string>;

	/** Email form control. */
	email: FormControl<string>;

	/** Password form control. */
	password: FormControl<string>;

	/** Retype password control. */
	retypePassword: FormControl<string>;
}

/** Component for registration. */
@Component({
	selector: 'registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	/** Login form group. */
	protected readonly formGroup: FormGroup<RegistrationFormControls>;

	public constructor() {
		const passwordControl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(AuthenticationConstants.minPasswordLength),
		]);

		this.formGroup = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: passwordControl,
			retypePassword: ['', [Validators.required, ApplicationValidators.retypePassword(passwordControl)]],
		});
	}

	/** Handle login form submitting. */
	protected handleSubmit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		const formData = this.formGroup.getRawValue();

		this.authService.register({
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
			retypePassword: formData.retypePassword,
		}).pipe(
			tap(_ => this.router.navigate([''])),
			catchApiError(apiError => of(this.catchRegistrationError(apiError))),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}

	private catchRegistrationError(apiError: ApiError): void {
		this.formGroup.setErrors({
			server: apiError.errorMessages.join(' '),
		});
	}
}
