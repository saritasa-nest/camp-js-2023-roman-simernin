import { AnimeTypeDto } from '../../dtos/anime/anime-type.dto';
import { AnimeType } from '../../models/anime/anime';

export namespace AnimeTypeMapper {

	const mappings: readonly AnimeTypeMapping[] = [
		{ model: AnimeType.TV, dto: AnimeTypeDto.TV },
		{ model: AnimeType.OVA, dto: AnimeTypeDto.OVA },
		{ model: AnimeType.Movie, dto: AnimeTypeDto.Movie },
		{ model: AnimeType.Special, dto: AnimeTypeDto.Special },
		{ model: AnimeType.ONA, dto: AnimeTypeDto.ONA },
		{ model: AnimeType.Music, dto: AnimeTypeDto.Music },
		{ model: AnimeType.Unknown, dto: AnimeTypeDto.Unknown },
	];

	/**
	 * Map dto to model for anime type.
	 * @param dto Anime type dto.
	 */
	export function fromDto(dto: AnimeTypeDto): AnimeType {
		const mappingByDto = mappings.find(mapping => mapping.dto === dto);

		if (mappingByDto === undefined) {
			throw new Error(`There is no AnimeType for AnimeTypeDto ${dto}`);
		}

		return mappingByDto.model;
	}

	/**
	 * Map model to dto for anime type.
	 * @param model Anime type model.
	 */
	export function toDto(model: AnimeType): AnimeTypeDto {
		const mappingByModel = mappings.find(mapping => mapping.model === model);

		if (mappingByModel === undefined) {
			throw new Error(`There is no AnimeTypeDto for AnimeType ${model}`);
		}

		return mappingByModel.dto;
	}

	/** Anime type mapping. */
	interface AnimeTypeMapping {

		/** Anime type model. */
		readonly model: AnimeType;

		/** Anime type dto. */
		readonly dto: AnimeTypeDto;
	}
}
