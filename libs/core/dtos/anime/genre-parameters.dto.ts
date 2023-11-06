import { PaginationParametersDto } from '../pagination.paramters.dto';
import { SortingParametersDto } from '../sorting-parameters.dto';

/** Genre parameters DTO. */
export interface GenreParametersDto extends PaginationParametersDto, SortingParametersDto {

	/** Search by name. */
	readonly search: string;
}
