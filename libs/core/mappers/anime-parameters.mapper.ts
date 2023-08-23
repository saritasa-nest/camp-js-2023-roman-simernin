import { AnimeParametersDto } from '../dtos/anime-parameters.dto';
import { AnimeParameters } from '../models/anime-parameters';
import { AnimeSortingField } from '../models/anime-sorting-field';
import { SortingDirection } from '../models/sorting-parameters';

export namespace AnimeParametersMapper {

	/**
	 * Map model to dto for anime list parameters.
	 * @param model Model for anime list parameters.
	 */
	export function toDto(model: AnimeParameters): AnimeParametersDto {
		let sortingString: string | null = null;

		if (model.sortingField !== null) {
			switch (model.sortingField) {
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

			if (model.sortingDirection === SortingDirection.Descending) {
				sortingString = `-${sortingString}`;
			}
		}

		return {
			limit: model.pageSize,
			offset: model.pageSize * (model.pageNumber - 1),
			ordering: sortingString ?? '',
			type__in: model.animeTypes.toString(),
			search: model.search ?? '',
		};
	}
}
