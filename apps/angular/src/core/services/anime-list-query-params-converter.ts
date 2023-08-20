import { Injectable } from '@angular/core';
import { ParamMap, convertToParamMap } from '@angular/router';
import { AnimeListParameters } from '@js-camp/core/models/anime-list-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';

/** Converter for query params for anime list. */
@Injectable()
export class AnimeListQueryParamsConverter {

	private readonly pageSizeParameter: string = 'pageSize';

	private readonly pageNumberParameter: string = 'pageNumber';

	private readonly filterParameter: string = 'types';

	private readonly searchParameter: string = 'search';

	private readonly sortingFieldParameter: string = 'sortingField';

	private readonly sortingDicrectionParameter: string = 'sortingDirection';

	/** Convert object to query params map.
		* @param queryParamsAsObject - Query params as object.
		*/
	public to(queryParamsAsObject: AnimeListParameters): ParamMap {
		const queryParamsAsMap = new Map<string, string | number>();

		queryParamsAsMap.set(this.pageSizeParameter, queryParamsAsObject.pagination.pageSize);
		queryParamsAsMap.set(this.pageNumberParameter, queryParamsAsObject.pagination.pageNumber);

		if (queryParamsAsObject.sorting.field !== null) {
			queryParamsAsMap.set(this.sortingFieldParameter, queryParamsAsObject.sorting.field);
			queryParamsAsMap.set(this.sortingDicrectionParameter, queryParamsAsObject.sorting.isAscending ? 'asc' : 'desc');
		}

		if (queryParamsAsObject.filters.animeTypes.length !== 0) {
			queryParamsAsMap.set(this.filterParameter, queryParamsAsObject.filters.animeTypes.toString());
		}

		if (queryParamsAsObject.search.title !== null) {
			queryParamsAsMap.set(this.searchParameter, queryParamsAsObject.search.title);
		}

		return convertToParamMap(queryParamsAsMap);
	}

	/** Convert from query params to object.
		* @param queryParamsAsMap - Query params as map.
	 */
	public from(queryParamsAsMap: ParamMap): AnimeListParameters {

		let pageSize = 1;

		const pageSizeAsString = queryParamsAsMap.get(this.pageSizeParameter);

		if (pageSizeAsString !== null) {
			const parsedPageSize = parseInt(pageSizeAsString, 10);
			if (!isNaN(parsedPageSize)) {
				pageSize = parsedPageSize;
			}
		}

		let pageNumber = 1;

		const pageNumberAsString = queryParamsAsMap.get(this.pageSizeParameter);

		if (pageNumberAsString !== null) {
			const parsedPageNumber = parseInt(pageNumberAsString, 10);
			if (!isNaN(parsedPageNumber)) {
				pageNumber = parsedPageNumber;
			}
		}

		let sortingField: AnimeSortingField | null = null;

		const sortingFieldAsString = queryParamsAsMap.get(this.sortingFieldParameter);

		if (sortingFieldAsString !== null) {
			sortingField = sortingFieldAsString as AnimeSortingField;
		}

		return {
			pagination: new PaginationParameters(pageSize, pageNumber),
			sorting: {
				field: sortingField,
				isAscending: queryParamsAsMap.get(this.sortingDicrectionParameter) !== 'desc',
			},
			filters: {
				animeTypes: queryParamsAsMap.get(this.filterParameter)?.split(',') ?? [],
			},
			search: {
				title: queryParamsAsMap.get(this.searchParameter),
			},
		};
	}
}
