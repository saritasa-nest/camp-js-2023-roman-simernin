/** Result of authentication. */
export interface AuthResultDto {

	/** Access token. */
	readonly access: string;

	/** Refresh token. */
	readonly refresh: string;
}
