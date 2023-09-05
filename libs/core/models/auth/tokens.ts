/** Result of authentication. */
export interface Tokens {

	/** Access token. */
	readonly accessToken: string;

	/** Refresh token. */
	readonly refreshToken: string;
}
