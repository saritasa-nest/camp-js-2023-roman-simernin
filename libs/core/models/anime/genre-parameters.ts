import { PaginationParameters } from '../pagination-parameters';
import { SortingParameters } from '../sorting-parameters';

import { GenreSortingField } from './genre-sorting-field';

/** Genre parameters. */
export interface GenreParameters extends PaginationParameters, SortingParameters<GenreSortingField> {

	/** Search by name. */
	readonly search: string;
}
