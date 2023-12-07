import { ImageFile } from '../image-file';
import { MultipleAutocompleteItem } from '../multiple-autocomplete-item';

import { AnimeType } from './anime';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { AnimeStatus } from './anime-status';

/** Model for anime form data. */
export interface AnimeFormData {
	/** Image file.*/
	readonly imageFile: ImageFile;

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

	/** Genres. */
	readonly genres: MultipleAutocompleteItem[];

	/** Genres. */
	readonly studios: MultipleAutocompleteItem[];
}
