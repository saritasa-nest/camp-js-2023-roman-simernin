import { PaginationParametersDto } from '../pagination.paramters.dto';

/** Genre parameters DTO. */
export interface GenreParametersDto extends PaginationParametersDto {

	/** Search by name. */
	readonly search: string;
}
