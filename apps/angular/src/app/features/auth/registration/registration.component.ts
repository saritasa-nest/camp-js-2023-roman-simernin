import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { ApplicationValidators } from '@js-camp/angular/core/utils/application-validators';
import { catchAppError } from '@js-camp/angular/core/utils/rxjs/catch-app.error';
import { AppError } from '@js-camp/core/models/app-error';
import { AuthenticationConstants } from '@js-camp/core/utils/authentication-constants';
import { BehaviorSubject, EMPTY, Observable, tap } from 'rxjs';

/** Registration form controls. */
interface RegistrationFormControls {

	/** First name form control. */
	readonly firstName: FormControl<string>;

	/** Last name form control. */
	readonly lastName: FormControl<string>;

	/** Email form control. */
	readonly email: FormControl<string>;

	/** Password form control. */
	readonly password: FormControl<string>;

	/** Retype password control. */
	readonly retypePassword: FormControl<string>;
}

/** Component for registration. */
@Component({
	selector: 'camp-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	/** Login error subject. */
	protected readonly registrationError$ = new BehaviorSubject<string | null>(null);

	/** Registration form group. */
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
		this.formGroup.markAllAsTouched();

		if (this.formGroup.invalid) {
			return;
		}

		const formData = this.formGroup.getRawValue();

		this.authService.register({
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
		}).pipe(
			tap(() => this.router.navigate([''])),
			catchAppError(appError => this.catchRegistrationError(appError)),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}

	private catchRegistrationError(appError: AppError): Observable<void> {
		const registrationError = appError.errorMessages.join(' ');

		this.registrationError$.next(registrationError);

		return EMPTY;
	}
}
