import { AnimeStatus } from './anime-status';

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

	/** Start date of airing. */
	readonly airedStartDate: Date;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;
}

/** Anime type. */
export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'Unknown',
}
