import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param dto Pagination dto.
		* @param mapper Mapper from dto to model.
	 */
	export function fromDto<TDto, TModel>(dto: PaginationDto<TDto>, mapper: (dto: TDto) => TModel): Pagination<TModel> {
		return {
			totalCount: dto.count,
			results: dto.results.map(mapper),
		};
	}
}
