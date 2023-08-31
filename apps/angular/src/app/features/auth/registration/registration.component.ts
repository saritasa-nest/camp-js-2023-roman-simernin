import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { ApplicationValidators } from '@js-camp/angular/core/utils/application-validators';
import { catchApiError } from '@js-camp/angular/core/utils/rxjs/catch-api-error';
import { ApiError } from '@js-camp/core/models/api-error';
import { first, of, tap } from 'rxjs';

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

	private readonly formBuilder = inject(FormBuilder);

	/** Login form group. */
	protected readonly formGroup: FormGroup<{
		firstName: FormControl<string | null>;
		lastName: FormControl<string | null>;
		email: FormControl<string | null>;
		password: FormControl<string | null>;
		retypePassword: FormControl<string | null>;
	}>;

	public constructor() {
		const passwordControl = new FormControl('', [Validators.required, ApplicationValidators.passwordMinLength()]);

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
			firstName: formData.firstName ?? '',
			lastName: formData.lastName ?? '',
			email: formData.email ?? '',
			password: formData.password ?? '',
			retypePassword: formData.retypePassword ?? '',
		}).pipe(
			first(),
			tap(_ => this.router.navigate([''])),
			catchApiError(apiError => of(this.catchLoginError(apiError))),
		)
			.subscribe();
	}

	private catchLoginError(apiError: ApiError): void {
		this.formGroup.setErrors({
			server: apiError.errorMessages.join(' '),
		});
	}
}
