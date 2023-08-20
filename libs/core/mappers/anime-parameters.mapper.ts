import { AnimeParametersDto } from '../dtos/anime-parameters.dto';
import { AnimeParameters } from '../models/anime-parameters';
import { AnimeSortingField } from '../models/anime-sorting-field';

export namespace AnimeParametersMapper {

	/**
	 * Map model to dto for anime list parameters.
	 * @param model Model for anime list parameters.
	 */
	export function toDto(model: AnimeParameters): AnimeParametersDto {
		let sortingString: string | null = null;

		if (model.sorting.field !== null) {
			switch (model.sorting.field) {
				case AnimeSortingField.EnglishTitle:
					sortingString = 'title_eng';
					break;
				case AnimeSortingField.AiredStartDate:
					sortingString = 'aired__startswith';
					break;
				case AnimeSortingField.Status:
					sortingString = 'status';
					break;
				default:
					throw new Error('There is no sorting for this field.');
			}
	
			if (!model.sorting.isAscending) {
				sortingString = `-${sortingString}`;
			}
		}

		return {
			limit: model.pagination.pageSize,
			offset: model.pagination.offset,
			ordering: sortingString ?? '',
			type__in: model.filters.animeTypes.length !== 0
				? model.filters.animeTypes.toString()
				: '',
			search: model.search.title ?? '',
		};
	}
}