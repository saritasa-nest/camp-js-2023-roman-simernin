import { AnimeType } from './anime';

/** DTO of anime for preview. */
export interface AnimeDetails {

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
	readonly type: AnimeType;

	/** Status. */
	readonly status: string;

	/** Age rating. */
	readonly ageRating: string;

	/** Source. */
	readonly source: string;

	/** Season. */
	readonly season: string;

	/** Description. */
	readonly description: string;

	/** Airing status. */
	readonly airingStatus: boolean;

	/** Studios names. */
	readonly studioNames: readonly string[];

	/** Genres names. */
	readonly genreNames: readonly string[];

	/** Youtube trailer id. */
	readonly youtubeTrailerId: string | null;
}
