import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {

	/**
	 * Stream for authentication flag.
	 */
	public readonly isAuthenticated$: Observable<boolean>;

	public constructor(
		protected readonly authService: AuthService,
		private readonly router: Router,
	) {
		this.isAuthenticated$ = authService.isAuthenticated$;
	}
}
