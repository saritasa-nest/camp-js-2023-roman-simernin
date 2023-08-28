import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../core/services/auth.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {

	private readonly authService = inject(AuthService);

	/**
	 * Stream for authentication flag.
	 */
	protected readonly isAuthenticated$: Observable<boolean>;

	public constructor() {
		this.isAuthenticated$ = this.authService.isAuthenticated$;
	}

	/** Handle logout. */
	protected handleLogout(): void {
		this.authService.logout();
	}
}
