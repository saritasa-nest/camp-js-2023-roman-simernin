import { AnimeSeasonDto } from '../../dtos/anime/anime-season.dto';
import { EnumMapping } from '../enum-mapping';
import { AnimeSeason } from '../../models/anime/anime-season';

export namespace AnimeSeasonMapper {

	type AnimeSeasonMapping = EnumMapping<AnimeSeasonDto, AnimeSeason>;

	const mappings: readonly AnimeSeasonMapping[] = [
		{ model: AnimeSeason.Summer, dto: AnimeSeasonDto.Summer },
		{ model: AnimeSeason.Winter, dto: AnimeSeasonDto.Winter },
		{ model: AnimeSeason.Spring, dto: AnimeSeasonDto.Spring },
		{ model: AnimeSeason.Fall, dto: AnimeSeasonDto.Fall },
		{ model: AnimeSeason.NonSeasonal, dto: AnimeSeasonDto.NonSeasonal },
	];

	/**
	 * Map dto to model for anime season.
	 * @param dto Anime season dto.
	 */
	export function fromDto(dto: AnimeSeasonDto): AnimeSeason {
		const mappingByDto = mappings.find(mapping => mapping.dto === dto);

		if (mappingByDto === undefined) {
			throw new Error(`There is no AnimeSeason for AnimeSeasonDto ${dto}`);
		}

		return mappingByDto.model;
	}

	/**
	 * Map model to dto for anime season.
	 * @param model Anime season model.
	 */
	export function toDto(model: AnimeSeason): AnimeSeasonDto {
		const mappingByModel = mappings.find(mapping => mapping.model === model);

		if (mappingByModel === undefined) {
			throw new Error(`There is no AnimeSeasonDto for AnimeSeason ${model}`);
		}

		return mappingByModel.dto;
	}
}
