/** Model for anime airing. */
export interface AnimeAiring {

	/** Start date in format yyyy-MM-ddT00HH:mm:ssZ. */
	readonly start: Date;

	/** End date in format yyyy-MM-ddT00HH:mm:ssZ. */
	readonly end: Date;
}
