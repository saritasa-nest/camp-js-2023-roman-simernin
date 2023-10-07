import { AnimeStatusDto } from '../../dtos/anime/anime-status.dto';
import { AnimeStatus } from '../../models/anime/anime-status';
import { EnumMapping } from '../enum-mapping';

export namespace AnimeStatusMapper {

	type AnimeStatusMapping = EnumMapping<AnimeStatusDto, AnimeStatus>;

	const mappings: readonly AnimeStatusMapping[] = [
		{ model: AnimeStatus.Airing, dto: AnimeStatusDto.Airing },
		{ model: AnimeStatus.Finished, dto: AnimeStatusDto.Finished },
		{ model: AnimeStatus.NotYetAired, dto: AnimeStatusDto.NotYetAired },
		{ model: AnimeStatus.Unknown, dto: AnimeStatusDto.Unknown },
	];

	/**
	 * Map dto to model for anime status.
	 * @param dto Anime status dto.
	 */
	export function fromDto(dto: AnimeStatusDto): AnimeStatus {
		const mappingByDto = mappings.find(mapping => mapping.dto === dto);

		if (mappingByDto === undefined) {
			throw new Error(`There is no AnimeStatus for AnimeStatusDto ${dto}`);
		}

		return mappingByDto.model;
	}

	/**
	 * Map model to dto for anime status.
	 * @param model Anime status model.
	 */
	export function toDto(model: AnimeStatus): AnimeStatusDto {
		const mappingByModel = mappings.find(mapping => mapping.model === model);

		if (mappingByModel === undefined) {
			throw new Error(`There is no AnimeStatusDto for AnimeStatus ${model}`);
		}

		return mappingByModel.dto;
	}
}
