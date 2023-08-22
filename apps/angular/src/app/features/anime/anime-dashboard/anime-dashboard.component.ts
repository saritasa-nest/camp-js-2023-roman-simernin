import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, switchMap, map, merge, BehaviorSubject, tap, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sort } from '@angular/material/sort';
import { SortingDirection, SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { FormControl } from '@angular/forms';
import { AnimeParametersService } from '@js-camp/angular/core/services/anime-parameters.service';
import { AnimeParametersServiceFactory } from '@js-camp/angular/core/services/anime-parameters-service.factory';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { AnimeParameters } from '@js-camp/core/models/anime-parameters';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	providers: [AnimeParametersServiceFactory],
})
export class AnimeDashboardComponent implements OnInit, OnDestroy {

	private readonly animeParametersService: AnimeParametersService;

	private animeSelectionChangedSubscription: Subscription = new Subscription();

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

	/** Initial anime sorting. */
	public readonly initialSortingParameters: SortingParameters<AnimeSortingField>;

	/** Paginator settings. */
	public readonly paginatorSettings$: BehaviorSubject<PaginationParameters>;

	/** Types form control. */
	public readonly animeTypesFormControl: FormControl<readonly string[] | null>;

	/** Search form control. */
	public readonly searchFormControl: FormControl;

	/** Anime types. */
	public readonly animeTypes: string[] = ['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music', 'Unknown'];

	/** Observable for anime previews. */
	public readonly paginatedAnime$: Observable<Pagination<Anime>>;

	public constructor(
		animeService: AnimeService,
		animeParametersServiceFactory: AnimeParametersServiceFactory,
	) {

		this.animeParametersService = animeParametersServiceFactory.create(this.defaultPageSize, this.availablePageSizes);

		const initialAnimeParameters = this.animeParametersService.animeParameters;

		this.initialSortingParameters = initialAnimeParameters;

		this.animeTypesFormControl = new FormControl<readonly string[]>(initialAnimeParameters.animeTypes);
		this.searchFormControl = new FormControl(initialAnimeParameters.search, { updateOn: 'blur' });

		this.paginatorSettings$ = new BehaviorSubject<PaginationParameters>(initialAnimeParameters);

		this.paginatedAnime$ = this.animeParametersService.animeParameters$.pipe(
			switchMap(parameters => animeService.getAnimeList(parameters)),
		);
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.animeSelectionChangedSubscription.unsubscribe();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeSelectionChangedSubscription = merge(
			this.detectAnimeTypesParameterChange(),
			this.detectSearchParameterChange(),
		).pipe(
			tap(parameters => this.paginatorSettings$.next(parameters)),
		)
			.subscribe();
	}

	/**
	 * Handle pagination parameters change event.
	 * @param paginationEvent - Pagination event.
	 */
	public handlePaginationParametersChange(paginationEvent: PageEvent): void {
		const pageNumber: number = paginationEvent.pageIndex + 1;

		this.animeParametersService.setPagination({
			pageSize: paginationEvent.pageSize,
			pageNumber,
		});

		this.paginatorSettings$.next({
			pageSize: paginationEvent.pageSize,
			pageNumber,
		});
	}

	/**
	 * Handle sorting change event.
	 * @param sortingEvent - Sorting event.
	 */
	public handleSortingChange(sortingEvent: Sort): void {
		let sortingField: AnimeSortingField | undefined;
		let sortingDirection: SortingDirection | undefined;

		if (sortingEvent.direction !== '') {
			sortingField = sortingEvent.active as AnimeSortingField;
			sortingDirection = sortingEvent.direction as SortingDirection;
		}

		this.animeParametersService.setSorting({ sortingField, sortingDirection });
	}

	private detectSearchParameterChange(): Observable<AnimeParameters> {
		return this.searchFormControl.valueChanges.pipe(
			map(search => this.animeParametersService.setSearch(search)),
		);
	}

	private detectAnimeTypesParameterChange(): Observable<AnimeParameters> {
		return this.animeTypesFormControl.valueChanges.pipe(
			map(animeTypes => this.animeParametersService.setFilters(animeTypes ?? [])),
		);
	}
}
