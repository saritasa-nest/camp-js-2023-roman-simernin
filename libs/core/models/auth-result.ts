/** Result of authentication. */
export interface AuthResult {

	/** Access token. */
	readonly accessToken: string;

	/** Refresh token. */
	readonly refreshToken: string;
}
