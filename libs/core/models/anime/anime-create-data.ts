import { AnimeDetails } from './anime-details';

/** Data for anime creation. */
export type AnimeCreateData = Pick<
AnimeDetails,
| 'imageUrl'
| 'englishTitle'
| 'japaneseTitle'
| 'type'
| 'status'
| 'ageRating'
| 'source'
| 'season'
| 'description'
| 'isAiring'
| 'youtubeTrailerId'
> & {

	/** Genres ids. */
	readonly genreIds: readonly number[];

	/** Studio ids. */
	readonly studioIds: readonly number[];

	/** Aired start date. */
	readonly airedStart: Date;

	/** Aired end date. */
	readonly airedEnd: Date;
};
