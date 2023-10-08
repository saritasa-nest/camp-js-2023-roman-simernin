import { AnimeDetails } from '../../models/anime/anime-details';
import { AnimeManagement } from '../../models/anime/anime-management';
import { AnimeCreateDto } from '../../dtos/anime/anime-create.dto';
import { AnimeEditDto } from '../../dtos/anime/anime-edit.dto';

import { AnimeTypeMapper } from './anime-type.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeAiringMapper } from './anime-airing.mapper';
import { AnimeRatingMapper } from './anime-rating.mapper';
import { AnimeSourceMapper } from './anime-source.mapper';
import { AnimeSeasonMapper } from './anime-season.mapper';

export namespace AnimeManagementMapper {

	/**
	 * Map dto to model for anime management.
	 * @param details Anime details.
	 */
	export function fromDetails(details: AnimeDetails): AnimeManagement {
		return {
			youtubeTrailerId: details.youtubeTrailerId,
			englishTitle: details.englishTitle,
			japaneseTitle: details.japaneseTitle,
			type: details.type,
			status: details.status,
			isAiring: details.isAiring,
			airedDates: details.airedDates,
			description: details.description,
			ageRating: details.ageRating,
			source: details.source,
			season: details.season,
		};
	}

	/**
	 * Map model to dto for anime creation.
	 * @param management Anime management model.
	 */
	export function toCreateDto(management: AnimeManagement): AnimeCreateDto {
		return {
			image: '',
			trailer_youtube_id: management.youtubeTrailerId,
			title_eng: management.englishTitle,
			title_jpn: management.japaneseTitle,
			type: AnimeTypeMapper.toDto(management.type),
			status: AnimeStatusMapper.toDto(management.status),
			airing: management.isAiring,
			aired: AnimeAiringMapper.toDto(management.airedDates),
			synopsis: management.description,
			studios: [],
			genres: [],
			rating: AnimeRatingMapper.toDto(management.ageRating),
			source: AnimeSourceMapper.toDto(management.source),
			season: AnimeSeasonMapper.toDto(management.season),
		};
	}

	/**
	 * Map model to dto for anime editing.
	 * @param management Anime management model.
	 */
	export function toEditDto(management: AnimeManagement): AnimeEditDto {
		return {
			image: '',
			trailer_youtube_id: management.youtubeTrailerId,
			title_eng: management.englishTitle,
			title_jpn: management.japaneseTitle,
			type: AnimeTypeMapper.toDto(management.type),
			status: AnimeStatusMapper.toDto(management.status),
			airing: management.isAiring,
			aired: AnimeAiringMapper.toDto(management.airedDates),
			synopsis: management.description,
			studios: [],
			genres: [],
			rating: AnimeRatingMapper.toDto(management.ageRating),
			source: AnimeSourceMapper.toDto(management.source),
			season: AnimeSeasonMapper.toDto(management.season),
		};
	}
}
