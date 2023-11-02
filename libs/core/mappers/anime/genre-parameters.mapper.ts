import { GenreParameters } from '../../models/anime/genre-parameters';
import { GenreParametersDto } from '../../dtos/anime/genre-parameters.dto';

export namespace GenreParametersMapper {

	/**
	 * Maps model to dto.
	 * @param model Genre parameters dto.
	 */
	export function toDto(model: GenreParameters): GenreParametersDto {
		return {
			search: model.search,
		};
	}
}
