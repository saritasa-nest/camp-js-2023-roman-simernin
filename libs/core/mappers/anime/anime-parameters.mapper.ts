import { AnimeParametersDto } from '../../dtos/anime/anime-parameters.dto';
import { AnimeParameters } from '../../models/anime/anime-parameters';
import { AnimeSortingField } from '../../models/anime/anime-sorting-field';
import { SortingDirection, SortingParameters } from '../../models/sorting-parameters';

import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeParametersMapper {

	/**
	 * Map model to dto for anime list parameters.
	 * @param model Model for anime list parameters.
	 */
	export function toDto(model: AnimeParameters): AnimeParametersDto {
		return {
			limit: model.pageSize,
			offset: model.pageSize * (model.pageNumber - 1),
			ordering: mapSorting(model) ?? '',
			type__in: model.animeTypes
				.map(animeTypeModel => AnimeTypeMapper.toDto(animeTypeModel))
				.join(','),
			search: model.search ?? '',
		};
	}

	/**
	 * Map sorting parameters to ordering string.
	 * @param sortingParameters Sorting parameters.
	 */
	function mapSorting(sortingParameters: SortingParameters<AnimeSortingField>): string | null {
		if (sortingParameters.field === null || sortingParameters.direction === null) {
			return null;
		}

		const sortingFieldMap = new Map<AnimeSortingField, string>([
			[AnimeSortingField.EnglishTitle, 'title_eng'],
			[AnimeSortingField.AiredStartDate, 'aired__startswith'],
			[AnimeSortingField.Status, 'status'],
		]);

		const sortingField = sortingFieldMap.get(sortingParameters.field);

		if (sortingField === undefined) {
			console.warn('There is no sorting for this field.');

			return null;
		}

		return sortingParameters.direction === SortingDirection.Ascending ? sortingField : `-${sortingField}`;
	}
}
