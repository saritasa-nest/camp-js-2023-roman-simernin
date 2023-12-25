import { AnimeAiringDto } from '../../dtos/anime/anime-airing.dto';
import { AnimeAiring } from '../../models/anime/anime-airing';

export namespace AnimeAiringMapper {

	/**
	 * Map dto to model for anime airing.
	 * @param dto Anime airing dto.
	 */
	export function fromDto(dto: AnimeAiringDto): AnimeAiring {
		return {
			start: new Date(dto.start),
			end: new Date(dto.end),
		};
	}

	/**
	 * Map model to dto for anime airing.
	 * @param model Anime airing model.
	 */
	export function toDto(model: AnimeAiring): AnimeAiringDto {
		return {
			start: model.start.toISOString(),
			end: model.end.toISOString(),
		};
	}
}
