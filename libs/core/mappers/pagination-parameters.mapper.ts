import { PaginationParametersDto } from '../dtos/pagination.paramters.dto';
import { PaginationParameters } from '../models/pagination-parameters';

export namespace PaginationParametersMapper {

	/**
	 * Maps model to dto.
  * @param model - Model.
	 */
	export function toDto(model: PaginationParameters): PaginationParametersDto {
		return {
			limit: model.pageSize,
			offset: model.pageSize * (model.pageNumber - 1),
		};
	}
}
