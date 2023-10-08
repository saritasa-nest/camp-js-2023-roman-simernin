import { AnimeRatingDto } from '../../dtos/anime/anime-rating.dto';
import { EnumMapping } from '../enum-mapping';
import { AnimeRating } from '../../models/anime/anime-rating';

export namespace AnimeRatingMapper {

	type AnimeRatingMapping = EnumMapping<AnimeRatingDto, AnimeRating>;

	const mappings: readonly AnimeRatingMapping[] = [
		{ model: AnimeRating.G, dto: AnimeRatingDto.G },
		{ model: AnimeRating.PG, dto: AnimeRatingDto.PG },
		{ model: AnimeRating.PG13, dto: AnimeRatingDto.PG13 },
		{ model: AnimeRating.R17, dto: AnimeRatingDto.R17 },
		{ model: AnimeRating.RPlus, dto: AnimeRatingDto.RPlus },
		{ model: AnimeRating.PX, dto: AnimeRatingDto.PX },
		{ model: AnimeRating.Unknown, dto: AnimeRatingDto.Unknown },
	];

	/**
	 * Map dto to model for anime rating.
	 * @param dto Anime rating dto.
	 */
	export function fromDto(dto: AnimeRatingDto): AnimeRating {
		const mappingByDto = mappings.find(mapping => mapping.dto === dto);

		if (mappingByDto === undefined) {
			throw new Error(`There is no AnimeRating for AnimeRatingDto ${dto}`);
		}

		return mappingByDto.model;
	}

	/**
	 * Map model to dto for anime rating.
	 * @param model Anime rating model.
	 */
	export function toDto(model: AnimeRating): AnimeRatingDto {
		const mappingByModel = mappings.find(mapping => mapping.model === model);

		if (mappingByModel === undefined) {
			throw new Error(`There is no AnimeRatingDto for AnimeRating ${model}`);
		}

		return mappingByModel.dto;
	}
}
