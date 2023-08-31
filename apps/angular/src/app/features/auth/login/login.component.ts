import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { catchApiError } from '@js-camp/angular/core/utils/rxjs/catch-api-error';
import { ApiError } from '@js-camp/core/models/api-error';
import { first, of, tap } from 'rxjs';

/** Login component. */
@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {

	/** Login form group. */
	public readonly formGroup: FormGroup<{
		email: FormControl<string | null>;
		password: FormControl<string | null>;
	}>;

	public constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		formBuilder: FormBuilder,
	) {
		this.formGroup = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}

	/** Handle login form submitting. */
	public handleSubmit(): void {
		if (this.formGroup.invalid) {
			return;
		}

		const formData = this.formGroup.getRawValue();

		this.authService.login({
			email: formData.email ?? '',
			password: formData.password ?? '',
		}).pipe(
			first(),
			tap(_ => this.router.navigate([''])),
			catchApiError(apiError => of(this.catchLoginError(apiError))),
		)
			.subscribe();
	}

	private catchLoginError(apiError: ApiError): void {
		this.formGroup.setErrors({
			server: apiError.errorMessages.toString(),
		});
	}
}
