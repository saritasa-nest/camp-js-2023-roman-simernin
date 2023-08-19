import { AnimeFilterParameters } from './anime-filter-parameters';
import { AnimeSearchParameters } from './anime-search-parameters';
import { AnimeSortingField } from './anime-sorting-field';
import { PaginationParameters } from './pagination-parameters';
import { SortingParameters } from './sorting-parameters';

/** Parameters for getting anime list. */
export interface AnimeListParameters {

	/** Pagination parameters. */
	readonly pagination: PaginationParameters;

	/** Sorting parameters. */
	readonly sorting: SortingParameters<AnimeSortingField>;

	/** Filter parameters. */
	readonly filters: AnimeFilterParameters;

	/** Search parameters. */
	readonly search: AnimeSearchParameters;
}
