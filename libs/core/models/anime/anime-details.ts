import { AnimeType } from './anime';
import { AnimeStatus } from './anime-status';

/** Anime details. */
export interface AnimeDetails {

	/** Identifier. */
	readonly id: number;

	/** Image URL. */
	readonly imageUrl: string;

	/** Title in English. */
	readonly englishTitle: string;

	/** Title in Japanese. */
	readonly japaneseTitle: string;

	/** Start date of airing. */
	readonly airedStartDate: Date;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Age rating. */
	readonly ageRating: string;

	/** Source. */
	readonly source: string;

	/** Season. */
	readonly season: string;

	/** Description. */
	readonly description: string;

	/** Provides anime is airing. */
	readonly isAiring: boolean;

	/** Studios names. */
	readonly studioNames: readonly string[];

	/** Genres names. */
	readonly genreNames: readonly string[];

	/** Youtube trailer id. */
	readonly youtubeTrailerId: string | null;
}
