import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AnimeParameters } from '@js-camp/core/models/anime-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { SortingDirection, SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { nameofFactory } from '@js-camp/core/utils/nameof';
import { Observable, map } from 'rxjs';

/** Service for changing anime parameters. */
export class AnimeParametersService {

	public constructor(
		private readonly defaultPageSize: number,
		protected readonly availablePageSizes: readonly number[],
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
	}

	/**
	 * Anime parameters.
	 */
	public get animeParameters(): AnimeParameters {
		return this.parseAnimeParameters(this.activatedRoute.snapshot.queryParamMap);
	}

	/**
	 * Anime parameters stream.
	 */
	public get animeParameters$(): Observable<AnimeParameters> {
		return this.activatedRoute.queryParamMap.pipe(
			map(params => this.parseAnimeParameters(params)),
		);
	}

	/**
	 * Append parameters for anime pagination.
	 * @param pagination - Pagination parameters.
	 */
	public appendPagination(pagination: PaginationParameters): void {
		this.appendParams(pagination);
	}

	/**
	 * Append parameters for anime sortings.
	 * @param sorting - Sorting parameters.
	 */
	public appendSorting(sorting: SortingParameters<AnimeSortingField>): void {
		this.appendParams(sorting);
	}

	/**
	 * Append parameters for anime search.
	 * @param search - New anime search value.
	 */
	public appendSearch(search: string | null): void {
		this.appendParams({ search });
	}

	/**
	 * Append parameters for anime filters.
	 * @param animeTypes - New anime types for filter.
	 */
	public appendFilters(animeTypes: readonly string[]): void {
		this.appendParams({ animeTypes });
	}

	private appendParams(params: Params): void {
		this.router.navigate([], { queryParams: params, queryParamsHandling: 'merge' });
	}

	private parseAnimeParameters(paramMap: ParamMap): AnimeParameters {
		const defaultPageNumber = 1;

		const nameof = nameofFactory<AnimeParameters>();

		const pageSize = Number.parseInt(paramMap.get(nameof('pageSize')) ?? '', 10);
		const pageNumber = Number.parseInt(paramMap.get(nameof('pageNumber')) ?? '', 10);

		const validPageSize = this.availablePageSizes.includes(pageSize) ? pageSize : this.defaultPageSize;

		const validPageNumber = pageNumber > defaultPageNumber ? pageNumber : defaultPageNumber;

		return {
			pageSize: validPageSize,
			pageNumber: validPageNumber,
			sortingField: paramMap.get(nameof('sortingField')) as AnimeSortingField,
			sortingDirection: paramMap.get(nameof('sortingDirection')) as SortingDirection,
			animeTypes: paramMap.getAll(nameof('animeTypes')),
			search: paramMap.get(nameof('search')),
		};
	}
}
