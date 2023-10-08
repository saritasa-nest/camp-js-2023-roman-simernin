import { AnimeType } from './anime';
import { AnimeAiring } from './anime-airing';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { AnimeStatus } from './anime-status';

/** Model for anime create/edit. */
export interface AnimeManagement {

	/** Youtube trailer id. */
	readonly youtubeTrailerId: string | null;

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

	/** Airing dates. */
	readonly airedDates: AnimeAiring;

	/** Description. */
	readonly description: string;

	/** Age rating. */
	readonly ageRating: AnimeRating;

	/** Source. */
	readonly source: AnimeSource;

	/** Season. */
	readonly season: AnimeSeason;
}
