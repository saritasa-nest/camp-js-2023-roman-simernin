import { PaginationParameters } from '../pagination-parameters';
import { SortingParameters } from '../sorting-parameters';

import { StudioSortingField } from './studio-sorting-field';

/** Studio parameters. */
export interface StudioParameters extends PaginationParameters, SortingParameters<StudioSortingField> {

	/** Search by name. */
	readonly search: string;
}
