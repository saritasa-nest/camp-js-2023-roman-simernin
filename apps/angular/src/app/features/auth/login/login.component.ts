import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
		formBuilder: FormBuilder,
	) {
		this.formGroup = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}
}
