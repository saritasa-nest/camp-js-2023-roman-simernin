import { PaginationParametersDto } from '../pagination.paramters.dto';
import { SortingParametersDto } from '../sorting-parameters.dto';

/** Studio parameters dto. */
export interface StudioParametersDto extends PaginationParametersDto, SortingParametersDto {

	/** Search by name. */
	readonly search: string;
}
