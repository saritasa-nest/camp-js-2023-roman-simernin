import { AnimeDetails } from '../../models/anime/anime-details';
import { AnimeDetailsDto } from '../../dtos/anime/anime-details.dto';

import { AnimeTypeMapper } from './anime-type.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeRatingMapper } from './anime-rating.mapper';
import { AnimeSourceMapper } from './anime-source.mapper';
import { AnimeSeasonMapper } from './anime-season.mapper';
import { AnimeAiringMapper } from './anime-airing.mapper';
import { StudioMapper } from './studio.mapper';
import { GenreMapper } from './genre.mapper';

export namespace AnimeDetailsMapper {

	/**
	 * Map dto to model for anime details.
	 * @param dto Anime details dto.
	 */
	export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
		return {
			id: dto.id,
			imageUrl: dto.image,
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			airedDates: AnimeAiringMapper.fromDto(dto.aired),
			type: AnimeTypeMapper.fromDto(dto.type),
			status: AnimeStatusMapper.fromDto(dto.status),
			ageRating: AnimeRatingMapper.fromDto(dto.rating),
			source: AnimeSourceMapper.fromDto(dto.source),
			season: AnimeSeasonMapper.fromDto(dto.season),
			description: dto.synopsis,
			isAiring: dto.airing,
			studios: dto.studios_data.map(studioDto => StudioMapper.fromDto(studioDto)),
			genres: dto.genres_data.map(genreDto => GenreMapper.fromDto(genreDto)),
			youtubeTrailerId: dto.trailer_youtube_id,
		};
	}
}
