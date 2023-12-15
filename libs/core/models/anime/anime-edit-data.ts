import { AnimeType } from './anime';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { AnimeStatus } from './anime-status';

/** Data for anime editing. */
export interface AnimeEditData {
	/** Image file.*/
	readonly imageUrl: string;

	/** Youtube trailer id. */
	readonly youtubeTrailerId: string;

	/** Title in English. */
	readonly englishTitle: string;

	/** Title in Japanese. */
	readonly japaneseTitle: string;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Provides anime is airing. */
	readonly isAiring: boolean;

	/** Aired start date. */
	readonly airedStart: Date;

	/** Aired end date. */
	readonly airedEnd: Date;

	/** Description. */
	readonly description: string;

	/** Age rating. */
	readonly ageRating: AnimeRating;

	/** Source. */
	readonly source: AnimeSource;

	/** Season. */
	readonly season: AnimeSeason;

	/** Genres ids. */
	readonly genreIds: readonly number[];

	/** Studio ids. */
	readonly studioIds: readonly number[];
}
