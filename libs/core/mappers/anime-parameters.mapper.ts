import { AnimeParametersDto } from '../dtos/anime-parameters.dto';
import { AnimeParameters } from '../models/anime-parameters';
import { AnimeSortingField } from '../models/anime-sorting-field';
import { SortingDirection, SortingParameters } from '../models/sorting-parameters';

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
			type__in: model.animeTypes.toString(),
			search: model.search ?? '',
		};
	}

	/**
	 * Map sorting parameters to ordering string.
	 * @param sortingParameters Sorting parameters.
	 */
	function mapSorting(sortingParameters: SortingParameters<AnimeSortingField>): string | null {
		if (sortingParameters.sortingField === null || sortingParameters.sortingDirection === null) {
			return null;
		}

		const sortingFieldMap = new Map<AnimeSortingField, string>([
			[AnimeSortingField.EnglishTitle, 'title_eng'],
			[AnimeSortingField.AiredStartDate, 'aired__startswith'],
			[AnimeSortingField.Status, 'status'],
		]);

		const sortingField = sortingFieldMap.get(sortingParameters.sortingField);

		if (sortingField === undefined) {
			throw new Error('There is no sorting for this field.');
		}

		return sortingParameters.sortingDirection === SortingDirection.Ascending ? sortingField : `-${sortingField}`;
	} 
}
