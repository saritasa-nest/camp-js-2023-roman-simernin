import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeType } from '@js-camp/core/models/anime/anime';
import { AnimeParameters } from '@js-camp/core/models/anime/anime-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime/anime-sorting-field';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { SortingDirection, SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { EnumUtils } from '@js-camp/core/utils/enum.utils';
import { Observable, map } from 'rxjs';

type AnimePageQueryParams = Partial<Record<keyof AnimeParameters, string>>;

/** Service for changing anime parameters. */
@Injectable()
export class AnimeParametersService {

	/** Available page sizes for anime table. */
	public readonly availablePageSizes: readonly number[] = [5, 10, 25];

	private readonly defaultPaginationParameters: PaginationParameters = {
		pageNumber: 1,
		pageSize: Math.min(...this.availablePageSizes),
	};

	/** Anime parameters stream. */
	public readonly animeParameters$: Observable<AnimeParameters>;

	public constructor(
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
		this.animeParameters$ = this.activatedRoute.queryParams.pipe(
			map(params => this.parseAnimeParameters(params)),
		);
	}

	/** Anime parameters. */
	public get animeParameters(): AnimeParameters {
		return this.parseAnimeParameters(this.activatedRoute.snapshot.queryParams);
	}

	/**
	 * Append parameters for anime pagination.
	 * @param pagination - Pagination parameters.
	 */
	public setPagination(pagination: PaginationParameters): void {
		this.changeParams({
			pageSize: pagination.pageSize.toString(),
			pageNumber: pagination.pageNumber.toString(),
		});
	}

	/**
	 * Append parameters for anime sortings.
	 * @param sorting - Sorting parameters.
	 */
	public setSorting(sorting: SortingParameters<AnimeSortingField>): void {
		const hasSorting = sorting.field !== AnimeSortingField.None;
		this.changeParams({
			field: hasSorting ? sorting.field : undefined,
			direction: hasSorting ? sorting.direction : undefined,
		});
	}

	/**
	 * Append parameters for anime filters.
	 * @param animeTypes - New anime types for filter.
	 * @param search - Search value.
	 */
	public setFilters(search: string, animeTypes: readonly AnimeType[]): void {
		this.changeParams({
			pageNumber: this.defaultPaginationParameters.pageNumber.toString(),
			search: search !== '' ? search : undefined,
			animeTypes: animeTypes.length !== 0 ? animeTypes.join(',') : undefined,
		});
	}

	private changeParams(parameters: AnimePageQueryParams): void {
		this.router.navigate([], { queryParams: parameters, queryParamsHandling: 'merge' });
	}

	private parseAnimeParameters(queryParams: AnimePageQueryParams): AnimeParameters {
		const pageSize = Number.parseInt(queryParams.pageSize ?? '', 10);
		const pageNumber = Number.parseInt(queryParams.pageNumber ?? '', 10);

		const validPageSize = this.availablePageSizes.includes(pageSize) ? pageSize : this.defaultPaginationParameters.pageSize;

		const validPageNumber = isNaN(pageNumber) ?
			this.defaultPaginationParameters.pageNumber :
			Math.max(pageNumber, this.defaultPaginationParameters.pageNumber);

		return {
			pageSize: validPageSize,
			pageNumber: validPageNumber,
			field: EnumUtils.fromString(queryParams.field ?? '', AnimeSortingField) ?? AnimeSortingField.None,
			direction: EnumUtils.fromString(queryParams.direction ?? '', SortingDirection) ?? SortingDirection.Ascending,
			search: queryParams.search ?? '',
			animeTypes: queryParams.animeTypes
				?.split(',')
				?.map(animeTypeAsString => EnumUtils.fromString(animeTypeAsString, AnimeType))
				?.filter((animeType): animeType is AnimeType => animeType !== null) ?? [],
		};
	}
}
