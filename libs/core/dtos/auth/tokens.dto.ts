/** Tokens as result of authentication. */
export interface UserAccessTokenDto {

	/** Access token. */
	readonly access: string;

	/** Refresh token. */
	readonly refresh: string;
}
