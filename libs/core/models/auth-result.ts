/** Authentication result.*/
export interface AuthResult {

	/** Provides current user is authenticated. */
	readonly isAuthenticated: boolean;

	/** Error messages. */
	readonly errorMessages?: readonly string[];
}
