import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AnimeParameters } from '@js-camp/core/models/anime-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { SortingDirection, SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { nameofFactory } from '@js-camp/core/utils/nameof';
import { Observable, map } from 'rxjs';

/** Service for changing anime parameters. */
@Injectable()
export class AnimeParametersService {

	private readonly defaultPageNumber = 1;

	/** Available page sizes for anime table. */
	public readonly availablePageSizes: readonly number[] = [5, 10, 25];

	/** Default page size. */
	public readonly defaultPageSize = Math.min(...this.availablePageSizes);

	/**
	 * Anime parameters stream.
	 */
	public readonly animeParameters$: Observable<AnimeParameters>;

	public constructor(
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
		this.animeParameters$ = this.activatedRoute.queryParamMap.pipe(
			map(params => this.parseAnimeParameters(params)),
		);
	}

	/**
	 * Anime parameters.
	 */
	public get animeParameters(): AnimeParameters {
		return this.parseAnimeParameters(this.activatedRoute.snapshot.queryParamMap);
	}

	/**
	 * Append parameters for anime pagination.
	 * @param pagination - Pagination parameters.
	 */
	public setPagination(pagination: PaginationParameters): AnimeParameters {
		const newParameters: AnimeParameters = {
			...this.animeParameters,
			...pagination,
		};

		this.changeParams(newParameters);

		return newParameters;
	}

	/**
	 * Append parameters for anime sortings.
	 * @param sorting - Sorting parameters.
	 */
	public setSorting(sorting: SortingParameters<AnimeSortingField>): AnimeParameters {
		const newParameters: AnimeParameters = {
			...this.animeParameters,
			...sorting,
		};

		this.changeParams(newParameters);

		return newParameters;
	}

	/**
	 * Append parameters for anime filters.
	 * @param animeTypes - New anime types for filter.
	 * @param search - Search value.
	 */
	public setFilters(search: string | null, animeTypes: readonly string[]): AnimeParameters {
		const newParameters: AnimeParameters = {
			...this.animeParameters,
			...this.resetedPagination,
			search: search !== '' ? search : null,
			animeTypes,
		};

		this.changeParams(newParameters);

		return newParameters;
	}

	private get resetedPagination(): PaginationParameters {
		return {
			pageSize: this.animeParameters.pageSize,
			pageNumber: this.defaultPageNumber,
		};
	}

	private changeParams(parameters: AnimeParameters): void {
		this.router.navigate([], { queryParams: parameters });
	}

	private parseAnimeParameters(paramMap: ParamMap): AnimeParameters {
		const nameof = nameofFactory<AnimeParameters>();

		const pageSize = Number.parseInt(paramMap.get(nameof('pageSize')) ?? '', 10);
		const pageNumber = Number.parseInt(paramMap.get(nameof('pageNumber')) ?? '', 10);

		const validPageSize = this.availablePageSizes.includes(pageSize) ? pageSize : this.defaultPageSize;

		const validPageNumber = pageNumber > this.defaultPageNumber ? pageNumber : this.defaultPageNumber;

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
