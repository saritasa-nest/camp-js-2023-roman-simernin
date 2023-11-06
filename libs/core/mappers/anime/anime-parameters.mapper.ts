import { AnimeParametersDto } from '../../dtos/anime/anime-parameters.dto';
import { AnimeParameters } from '../../models/anime/anime-parameters';
import { AnimeSortingField } from '../../models/anime/anime-sorting-field';
import { PaginationParametersMapper } from '../pagination-parameters.mapper';
import { SortingParametersMapper } from '../sorting-parameters.mapper';

import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeParametersMapper {

	const animeSortingFieldMap = new Map<AnimeSortingField, string>([
		[AnimeSortingField.EnglishTitle, 'title_eng'],
		[AnimeSortingField.AiredStartDate, 'aired__startswith'],
		[AnimeSortingField.Status, 'status'],
	]);

	/**
	 * Map model to dto for anime list parameters.
	 * @param model Model for anime list parameters.
	 */
	export function toDto(model: AnimeParameters): AnimeParametersDto {
		return {
			type__in: model.animeTypes
				.map(animeTypeModel => AnimeTypeMapper.toDto(animeTypeModel))
				.join(','),
			search: model.search ?? '',
			...PaginationParametersMapper.toDto(model),
			...SortingParametersMapper.toDto(model, animeSortingFieldMap),
		};
	}
}
