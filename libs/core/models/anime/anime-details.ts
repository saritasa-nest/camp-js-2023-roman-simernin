import { AnimeType } from './anime';
import { AnimeAiring } from './anime-airing';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { AnimeStatus } from './anime-status';
import { Genre } from './genre';
import { Studio } from './studio';

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
	readonly airedDates: AnimeAiring;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Age rating. */
	readonly ageRating: AnimeRating;

	/** Source. */
	readonly source: AnimeSource;

	/** Season. */
	readonly season: AnimeSeason;

	/** Description. */
	readonly description: string;

	/** Provides anime is airing. */
	readonly isAiring: boolean;

	/** Studios names. */
	readonly studios: readonly Studio[];

	/** Genres names. */
	readonly genres: readonly Genre[];

	/** Youtube trailer id. */
	readonly youtubeTrailerId: string;
}
