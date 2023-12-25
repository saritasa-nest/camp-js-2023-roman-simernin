import { GenreParameters } from '../../models/anime/genre-parameters';
import { GenreParametersDto } from '../../dtos/anime/genre-parameters.dto';
import { GenreSortingField } from '../../models/anime/genre-sorting-field';
import { SortingParametersMapper } from '../sorting-parameters.mapper';
import { PaginationParametersMapper } from '../pagination-parameters.mapper';

export namespace GenreParametersMapper {

	const genreSortingFieldMap = new Map<GenreSortingField, string>([
		[GenreSortingField.Id, 'id'],
		[GenreSortingField.Name, 'name'],
	]);

	/**
	 * Maps model to dto.
	 * @param model Genre parameters dto.
	 */
	export function toDto(model: GenreParameters): GenreParametersDto {
		return {
			search: model.search,
			...PaginationParametersMapper.toDto(model),
			...SortingParametersMapper.toDto(model, genreSortingFieldMap),
		};
	}
}
