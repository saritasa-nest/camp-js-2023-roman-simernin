import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/** Guard provides user should be authenticated . */
export const shouldBeAuthenticatedGuard: CanActivateFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);

	const isAuthenticated = authService.isAuthenticated();

	if (!isAuthenticated) {
		return router.parseUrl('auth');
	}

	return isAuthenticated;
};

/** Guard provides user should be not authenticated . */
export const shouldBeNotAuthenticatedGuard: CanActivateFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);

	const isAuthenticated = authService.isAuthenticated();

	if (isAuthenticated) {
		router.parseUrl('');
	}

	return !isAuthenticated;
};
