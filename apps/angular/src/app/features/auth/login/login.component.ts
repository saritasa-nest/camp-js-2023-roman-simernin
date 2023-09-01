import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { catchApiError } from '@js-camp/angular/core/utils/rxjs/catch-api-error';
import { ApiError } from '@js-camp/core/models/api-error';
import { AuthenticationConstants } from '@js-camp/core/utils/authentication-constants';
import { of, tap } from 'rxjs';

/** Login form controls. */
interface LoginFormControls {

	/** Email control. */
	readonly email: FormControl<string>;

	/** Password control. */
	readonly password: FormControl<string>;
}

/** Login component. */
@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	/** Login form group. */
	protected readonly formGroup: FormGroup<LoginFormControls>;

	public constructor() {
		this.formGroup = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(AuthenticationConstants.minPasswordLength)]],
		});
	}

	/** Handle login form submitting. */
	protected handleSubmit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		const formData = this.formGroup.getRawValue();

		this.authService.login({
			email: formData.email,
			password: formData.password,
		}).pipe(
			tap(_ => this.router.navigate([''])),
			catchApiError(apiError => of(this.catchLoginError(apiError))),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}

	private catchLoginError(apiError: ApiError): void {
		this.formGroup.setErrors({
			login: apiError.errorMessages.join(' '),
		});
	}
}
