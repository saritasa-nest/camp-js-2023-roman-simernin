/** Auth state. */
export interface AuthState {

	/** Auth is loading. */
	readonly isLoading: boolean;

	/** Provides current user is authenticated. */
	readonly isAuthenticated: boolean;
}
