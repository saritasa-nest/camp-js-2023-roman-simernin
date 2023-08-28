import { AnimeTypeDto } from '../dtos/anime.dto';
import { AnimeType } from '../models/anime';

export namespace AnimeTypeMapper {

	const mappings: readonly AnimeTypeMapping[] = [
		{ animeTypeModel: AnimeType.TV, animeTypeDto: AnimeTypeDto.TV },
		{ animeTypeModel: AnimeType.OVA, animeTypeDto: AnimeTypeDto.OVA },
		{ animeTypeModel: AnimeType.Movie, animeTypeDto: AnimeTypeDto.Movie },
		{ animeTypeModel: AnimeType.Special, animeTypeDto: AnimeTypeDto.Special },
		{ animeTypeModel: AnimeType.ONA, animeTypeDto: AnimeTypeDto.ONA },
		{ animeTypeModel: AnimeType.Music, animeTypeDto: AnimeTypeDto.Music },
		{ animeTypeModel: AnimeType.Unknown, animeTypeDto: AnimeTypeDto.Unknown },
	];

	/**
	 * Map dto to model for anime type.
	 * @param dto Anime type dto.
	 */
	export function fromDto(dto: AnimeTypeDto): AnimeType {
		const mappingByDto = mappings.find(mapping => mapping.animeTypeDto === dto);

		if (mappingByDto === undefined) {
			throw new Error(`There is no AnimeType for AnimeTypeDto ${dto}`);
		}

		return mappingByDto.animeTypeModel;
	}

	/**
	 * Map model to dto for anime type.
	 * @param model Anime type model.
	 */
	export function toDto(model: AnimeType): AnimeTypeDto {
		const mappingByModel = mappings.find(mapping => mapping.animeTypeModel === model);

		if (mappingByModel === undefined) {
			throw new Error(`There is no AnimeTypeDto for AnimeType ${model}`);
		}

		return mappingByModel.animeTypeDto;
	}

	/** Anime type mapping. */
	interface AnimeTypeMapping {

		/** Anime type model. */
		readonly animeTypeModel: AnimeType;

		/** Anime type dto. */
		readonly animeTypeDto: AnimeTypeDto;
	}
}
