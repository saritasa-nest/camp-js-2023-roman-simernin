import { AppError } from '@js-camp/core/models/app-error';

/** Auth state. */
export interface AuthState {

	/** Auth is loading. */
	readonly isLoading: boolean;

	/** Provides current user is authenticated. */
	readonly isAuthenticated: boolean;

	/** Application error. */
	readonly error: AppError | null;
}
