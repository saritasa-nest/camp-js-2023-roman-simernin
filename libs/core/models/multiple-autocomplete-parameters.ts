import { PaginationParameters } from './pagination-parameters';

/** Multiple autocomplete parameters. */
export interface MultipleAutocompleteParameters extends PaginationParameters {

	/** Search by item name. */
	readonly search: string;
}
