import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
		private readonly authService: AuthService,
		private readonly router: Router,
	) {
		this.isAuthenticated$ = authService.isAuthenticated$;
	}

	/** Lgout. */
	public logout(): void {
		this.authService.logout();
		this.router.navigate(['login']);
	}
}
