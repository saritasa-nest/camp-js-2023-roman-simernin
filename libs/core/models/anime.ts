/** Domain model anime for preview. */
export interface Anime {

	/** Identifier. */
	readonly id: number;

	/** Image URL. */
	readonly imageUrl: string;

	/** Title in English. */
	readonly englishTitle: string;

	/** Title in Japanese. */
	readonly japaneseTitle: string;

	/** Start end date for airing. */
	readonly airedStartDate: Date;

	/** Type. */
	readonly type: string;

	/** Status. */
	readonly status: string;
}
