import { GenreDto } from './genre.dto';
import { AnimeAiringDto } from './anime-airing.dto';
import { AnimeTypeDto } from './anime-type.dto';
import { StudioDto } from './studio.dto';
import { AnimeStatusDto } from './anime-status.dto';
import { AnimeRatingDto } from './anime-rating.dto';
import { AnimeSourceDto } from './anime-source.dto';
import { AnimeSeasonDto } from './anime-season.dto';

/** DTO of anime for preview. */
export interface AnimeDetailsDto {

	/** Identifier. */
	readonly id: number;

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
	readonly status: AnimeStatusDto;

	/** General anime rating. */
	readonly score: number;

	/** Amine rating specified by the user. */
	readonly user_score: number;

	/** Age rating. */
	readonly rating: AnimeRatingDto;

	/** Source. */
	readonly source: AnimeSourceDto;

	/** Season. */
	readonly season: AnimeSeasonDto;

	/** Description. */
	readonly synopsis: string;

	/** Airing status. */
	readonly airing: boolean;

	/** Studios. */
	readonly studios_data: readonly StudioDto[];

	/** Genres. */
	readonly genres_data: readonly GenreDto[];

	/** Youtube trailer id. */
	readonly trailer_youtube_id: string | null;
}
