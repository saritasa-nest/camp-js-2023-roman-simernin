import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/**
 * Factory for authentication guard.
 * @param shouldBeAuthenticated - Provides current user should be authenticated.
 * */
export function authGuardFactory(shouldBeAuthenticated: boolean) {
	return function authGuard(): CanActivateFn {
		const authService = inject(AuthService);
		const router = inject(Router);

		const isAuthenticated: boolean = authService.isAuthenticated();

		if (isAuthenticated && !shouldBeAuthenticated) {
			router.navigate(['']);
		}

		if (!isAuthenticated && shouldBeAuthenticated) {
			router.navigate(['login']);
		}

		return () => isAuthenticated === shouldBeAuthenticated;
	};
}
