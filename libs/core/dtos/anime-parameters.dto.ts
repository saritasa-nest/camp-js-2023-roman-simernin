import { PaginationParametersDto } from './pagination.paramters.dto';
import { SortingParametersDto } from './sorting-parameters.dto';

/** DTO for getting anime. */
export interface AnimeParametersDto extends PaginationParametersDto, SortingParametersDto {

	/** Filter by types. Types are separated by comma. */
	readonly type__in: string;

	/** Search value. It is title (in English or Japanese).*/
	readonly search: string;
}
