import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AnimeParameters } from '@js-camp/core/models/anime-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { SortingDirection, SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { nameofFactory } from '@js-camp/core/utils/nameof';
import { BehaviorSubject, Observable, map } from 'rxjs';

/** Service for changing anime parameters. */
@Injectable()
export class AnimeParametersService {

	/** Available page sizes for anime table. */
	public readonly availablePageSizes: readonly number[] = [5, 10, 25];

	/** Default pagination parameters. */
	public readonly defaultPaginationParameters: PaginationParameters = {
		pageNumber: 1,
		pageSize: Math.min(...this.availablePageSizes),
	};

	private readonly paginationParametersSubject$ = new BehaviorSubject<PaginationParameters>(this.defaultPaginationParameters);

	/** Anime parameters stream. */
	public readonly animeParameters$: Observable<AnimeParameters>;

	public constructor(
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
		this.animeParameters$ = this.activatedRoute.queryParamMap.pipe(
			map(params => this.parseAnimeParameters(params)),
		);

		this.paginationParametersSubject$ = new BehaviorSubject<PaginationParameters>(this.animeParameters);
	}

	/** Paginator settings. */
	public get paginationParameters$(): Observable<PaginationParameters> {
		return this.paginationParametersSubject$.asObservable();
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

		this.paginationParametersSubject$.next(pagination);

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
		const paginationParameters = this.resetedPagination;

		const newParameters: AnimeParameters = {
			...this.animeParameters,
			...paginationParameters,
			search: search !== '' ? search : null,
			animeTypes,
		};

		this.changeParams(newParameters);

		this.paginationParametersSubject$.next(paginationParameters);

		return newParameters;
	}

	private get resetedPagination(): PaginationParameters {
		return {
			pageSize: this.animeParameters.pageSize,
			pageNumber: this.defaultPaginationParameters.pageNumber,
		};
	}

	private changeParams(parameters: AnimeParameters): void {
		this.router.navigate([], { queryParams: parameters });
	}

	private parseAnimeParameters(paramMap: ParamMap): AnimeParameters {
		const nameof = nameofFactory<AnimeParameters>();

		const pageSize = Number.parseInt(paramMap.get(nameof('pageSize')) ?? '', 10);
		const pageNumber = Number.parseInt(paramMap.get(nameof('pageNumber')) ?? '', 10);

		const validPageSize = this.availablePageSizes.includes(pageSize) ? pageSize : this.defaultPaginationParameters.pageSize;

		const validPageNumber = pageNumber > this.defaultPaginationParameters.pageNumber ?
			pageNumber : this.defaultPaginationParameters.pageNumber;

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
