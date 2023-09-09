import { Anime } from '../../models/anime/anime';
import { AnimeDto } from '../../dtos/anime/anime.dto';

import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeMapper {

	/**
	 * Map dto to model for anime preview.
	 * @param dto Genre dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			imageUrl: dto.image,
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			airedStartDate: new Date(dto.aired.start),
			type: AnimeTypeMapper.fromDto(dto.type),
			status: dto.status.replace(/_/g, ' '),
		};
	}
}
