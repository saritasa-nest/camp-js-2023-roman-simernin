/** Result of authentication. */
export interface TokensModel {

	/** Access token. */
	readonly accessToken: string;

	/** Refresh token. */
	readonly refreshToken: string;
}
