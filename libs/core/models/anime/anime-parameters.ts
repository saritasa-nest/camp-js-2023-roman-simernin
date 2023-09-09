import { PaginationParameters } from '../pagination-parameters';
import { SortingParameters } from '../sorting-parameters';

import { AnimeType } from './anime';

import { AnimeSortingField } from './anime-sorting-field';

/** Parameters for getting anime. */
export interface AnimeParameters extends PaginationParameters, SortingParameters<AnimeSortingField> {

	/** Anime types.*/
	readonly animeTypes: readonly AnimeType[];

	/** Search by title (English or Japanese). */
	readonly search: string;
}
