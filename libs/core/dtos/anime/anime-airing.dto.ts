/** DTO of anime airing. */
export interface AnimeAiringDto {

	/** Start date in format yyyy-MM-ddT00HH:mm:ssZ. */
	readonly start: string;

	/** End date in format yyyy-MM-ddT00HH:mm:ssZ. */
	readonly end: string;
}
