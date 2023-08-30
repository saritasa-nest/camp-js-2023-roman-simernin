import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AnimeType } from '@js-camp/core/models/anime';
import { AnimeParameters } from '@js-camp/core/models/anime-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { SortingDirection, SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { EnumUtils } from '@js-camp/core/utils/enum.utils';
import { nameofFactory } from '@js-camp/core/utils/nameof';
import { Observable, map } from 'rxjs';

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

	/** Anime parameters stream. */
	public readonly animeParameters$: Observable<AnimeParameters>;

	public constructor(
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
		this.animeParameters$ = this.activatedRoute.queryParamMap.pipe(
			map(params => this.parseAnimeParameters(params)),
		);
	}

	/** Anime parameters. */
	public get animeParameters(): AnimeParameters {
		return this.parseAnimeParameters(this.activatedRoute.snapshot.queryParamMap);
	}

	/**
	 * Append parameters for anime pagination.
	 * @param pagination - Pagination parameters.
	 */
	public setPagination(pagination: PaginationParameters): void {
		this.changeParams({
			...this.animeParameters,
			...pagination,
		});
	}

	/**
	 * Append parameters for anime sortings.
	 * @param sorting - Sorting parameters.
	 */
	public setSorting(sorting: SortingParameters<AnimeSortingField>): void {
		this.changeParams({
			...sorting,
		});
	}

	/**
	 * Append parameters for anime filters.
	 * @param animeTypes - New anime types for filter.
	 * @param search - Search value.
	 */
	public setFilters(search: string | null, animeTypes: readonly AnimeType[]): void {
		this.changeParams({
			pageNumber: this.defaultPaginationParameters.pageNumber,
			search: search !== '' ? search : null,
			animeTypes,
		});
	}

	private changeParams(parameters: Partial<AnimeParameters>): void {
		this.router.navigate([], { queryParams: parameters, queryParamsHandling: 'merge' });
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
			field: paramMap.get(nameof('field')) as AnimeSortingField,
			direction: paramMap.get(nameof('direction')) as SortingDirection,
			animeTypes: paramMap
				.getAll(nameof('animeTypes'))
				.map(animeTypeAsString => EnumUtils.fromString(animeTypeAsString, AnimeType)),
			search: paramMap.get(nameof('search')),
		};
	}
}
