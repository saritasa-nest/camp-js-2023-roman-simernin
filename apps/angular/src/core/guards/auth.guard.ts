import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/** Guard provides user should be authenticated . */
export function shouldBeAuthenticatedGuard(): CanActivateFn {
	const authService = inject(AuthService);
	const router = inject(Router);

	const isAuthenticated = authService.isAuthenticated();

	if (!isAuthenticated) {
		router.navigate(['login']);
	}

	return () => isAuthenticated;
}

/** Guard provides user should be not authenticated . */
export function shouldBeNotAuthenticatedGuard(): CanActivateFn {
	const authService = inject(AuthService);
	const router = inject(Router);

	const isAuthenticated = authService.isAuthenticated();

	if (isAuthenticated) {
		router.navigate(['']);
	}

	return () => !isAuthenticated;
}
