import { AnimeEditData } from '../../models/anime/anime-edit-data';
import { AnimeEditDto } from '../../dtos/anime/anime-edit.dto';

import { AnimeTypeMapper } from './anime-type.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeAiringMapper } from './anime-airing.mapper';
import { AnimeRatingMapper } from './anime-rating.mapper';
import { AnimeSourceMapper } from './anime-source.mapper';
import { AnimeSeasonMapper } from './anime-season.mapper';

export namespace AnimeEditMapper {

	/**
	 * Map model to dto for anime editing.
	 * @param model Anime editing model.
	 */
	export function toDto(model: AnimeEditData): AnimeEditDto {
		return {
			image: model.imageUrl,
			trailer_youtube_id: model.youtubeTrailerId,
			title_eng: model.englishTitle,
			title_jpn: model.japaneseTitle,
			type: AnimeTypeMapper.toDto(model.type),
			status: AnimeStatusMapper.toDto(model.status),
			airing: model.isAiring,
			aired: AnimeAiringMapper.toDto({
				start: model.airedStart,
				end: model.airedEnd,
			}),
			synopsis: model.description,
			studios: model.studioIds,
			genres: model.genreIds,
			rating: AnimeRatingMapper.toDto(model.ageRating),
			source: AnimeSourceMapper.toDto(model.source),
			season: AnimeSeasonMapper.toDto(model.season),
		};
	}
}
