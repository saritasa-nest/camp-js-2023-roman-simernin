import { PaginationParameters } from '../pagination-parameters';

/** Genre parameters. */
export interface GenreParameters extends PaginationParameters {

	/** Search by name. */
	readonly search: string;
}
