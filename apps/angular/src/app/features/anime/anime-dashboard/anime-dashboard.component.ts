import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, switchMap, map, tap, startWith } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sort } from '@angular/material/sort';
import { SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { FormControl } from '@angular/forms';
import { AnimeFilterParameters } from '@js-camp/core/models/anime-filter-parameters';
import { AnimeSearchParameters } from '@js-camp/core/models/anime-search-parameters';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
})
export class AnimeDashboardComponent {

	/** Displayed columns of anime table. */
	public readonly displayedAnimeTableColumns: readonly string[] = [
		'imageUrl',
		'englishTitle',
		'japaneseTitle',
		'type',
		'airedStartDate',
		'status',
	];

	/** Available page sizes for anime table. */
	public readonly availablePageSizes: number[] = [5, 10, 25];

	/** Default page size. */
	public readonly defaultPageSize: number = Math.min(...this.availablePageSizes);

	/** Types form control. */
	public readonly animeTypesFormControl = new FormControl('');

	/** Search form control. */
	public readonly searchFormControl = new FormControl('');

	/** Anime types. */
	public readonly animeTypes: string[] = ['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music', 'Unknown'];

	private paginationParameters$ = new BehaviorSubject<PaginationParameters>(new PaginationParameters(this.defaultPageSize, 1));

	private sortingParameters$ = new BehaviorSubject<SortingParameters<AnimeSortingField>>({
		field: null,
		isAscending: true,
	});

	/** Observable for anime previews. */
	public readonly paginatedAnime$: Observable<Pagination<Anime>>;

	public constructor(animeService: AnimeService) {

		const filterParameters$ = this.animeTypesFormControl.valueChanges
			.pipe(
				startWith(null),
				map(animeTypes => ({
					animeTypes: animeTypes !== null ? animeTypes : null,
				} as AnimeFilterParameters)),
			);

		const searchParameters$ = this.searchFormControl.valueChanges
			.pipe(
				startWith(null),
				map(title => ({ title } as AnimeSearchParameters))
			);

		this.paginatedAnime$ = combineLatest([
			this.paginationParameters$,
			this.sortingParameters$,
			filterParameters$,
			searchParameters$,
		])
			.pipe(switchMap(([paginationParameters, sortingParameters, filterParameters, searchParameters]) =>
				animeService.searchAnime(paginationParameters, sortingParameters, filterParameters, searchParameters)));
	}

	/**
	 * Handle pagination parameters change event.
	 * @param paginationEvent - Pagination event.
	 */
	public handlePaginationParametersChange(paginationEvent: PageEvent): void {
		const pageNumber: number = paginationEvent.pageIndex + 1;

		this.paginationParameters$.next(new PaginationParameters(
			paginationEvent.pageSize,
			pageNumber,
		));
	}

	/**
	 * Handle sorting change event.
	 * @param sortingEvent - Sorting event.
	 */
	public handleSortingChange(sortingEvent: Sort): void {
		let field: AnimeSortingField | null = null;
		let isAscending = true;

		if (sortingEvent.direction !== '') {
			field = sortingEvent.active as AnimeSortingField;
			isAscending = sortingEvent.direction === 'asc';
		}

		this.sortingParameters$.next({
			field,
			isAscending,
		});
	}
}
