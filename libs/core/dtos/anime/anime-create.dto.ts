import { AnimeAiringDto } from './anime-airing.dto';
import { AnimeRatingDto } from './anime-rating.dto';
import { AnimeSeasonDto } from './anime-season.dto';
import { AnimeSourceDto } from './anime-source.dto';
import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';

/** DTO for anime creation. */
export interface AnimeCreateDto {

	/** Image. */
	readonly image: string;

	/** Trailer video id on youtube. */
	readonly trailer_youtube_id: string | null;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Is this ongoing. */
	readonly airing: boolean;

	/** Release period. */
	readonly aired: AnimeAiringDto;

	/** Description. */
	readonly synopsis: string;

	/** Studios ids. */
	readonly studios: readonly number[];

	/** Genres ids. */
	readonly genres: readonly number[];

	/** Age rating. */
	readonly rating: AnimeRatingDto;

	/** Source. */
	readonly source: AnimeSourceDto;

	/** Season. */
	readonly season: AnimeSeasonDto;
}
