/** Tokens as result of authentication. */
export interface TokensDto {

	/** Access token. */
	readonly access: string;

	/** Refresh token. */
	readonly refresh: string;
}
