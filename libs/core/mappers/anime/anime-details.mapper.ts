import { AnimeDetails } from '../../models/anime/anime-details';
import { AnimeDetailsDto } from '../../dtos/anime/anime-details.dto';

import { AnimeTypeMapper } from './anime-type.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';

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
			airedStartDate: new Date(dto.aired.start),
			type: AnimeTypeMapper.fromDto(dto.type),
			status: AnimeStatusMapper.fromDto(dto.status),
			ageRating: dto.rating,
			source: dto.source,
			season: dto.season,
			description: dto.synopsis,
			isAiring: dto.airing,
			studioNames: dto.studios_data.map(studioDto => studioDto.name),
			genreNames: dto.genres_data.map(genreDto => genreDto.name),
			youtubeTrailerId: dto.trailer_youtube_id,
		};
	}
}
