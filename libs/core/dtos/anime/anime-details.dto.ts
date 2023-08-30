import { GenreDto } from './genre.dto';
import { AnimeAiringDto } from './anime-airing.dto';
import { AnimeTypeDto } from './anime-type.dto';
import { StudioDto } from './studio.dto';

/** DTO of anime for preview. */
export interface AnimeDetailsDto {

	/** Identifier. */
	readonly id: number;

	/** Creation date. */
	readonly created: string;

	/** Modification date. */
	readonly modified: string;

	/** Title in English. */
	readonly title_eng: string;

	/** Title in Japanese. */
	readonly title_jpn: string;

	/** Image URL. */
	readonly image: string;

	/** Start and end dates for airing. */
	readonly aired: AnimeAiringDto;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: string;

	/** General anime rating. */
	readonly score: number;

	/** Amine rating specified by the user. */
	readonly user_score: number;

	/** Age rating. */
	readonly rating: string;

	/** Source. */
	readonly source: string;

	/** Season. */
	readonly season: string;

	/** Description. */
	readonly synopsis: string;

	/** Airing status. */
	readonly airing: boolean;

	/** Studios. */
	readonly studios_data: readonly StudioDto[];

	/** Genres. */
	readonly genres_data: readonly GenreDto[];
}
