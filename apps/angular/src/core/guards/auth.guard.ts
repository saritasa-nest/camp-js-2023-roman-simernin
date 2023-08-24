import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/** Authentication guard. */
export function authGuard(): CanActivateFn {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (!authService.isAuthenticated()) {
		router.navigate(['login']);
	}

	return authService.isAuthenticated;
}
