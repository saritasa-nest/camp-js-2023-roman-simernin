import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, switchMap, map, tap, merge, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sort } from '@angular/material/sort';
import { SortingDirection } from '@js-camp/core/models/sorting-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { FormControl } from '@angular/forms';
import { AnimeParametersService } from '@js-camp/angular/core/services/anime-parameters.service';
import { AnimeParameters } from '@js-camp/core/models/anime-parameters';
import { AnimeParametersServiceFactory } from '@js-camp/angular/core/services/anime-parameters-service.factory';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	providers: [AnimeParametersServiceFactory],
})
export class AnimeDashboardComponent implements OnInit, OnDestroy {

	private readonly animeParametersService: AnimeParametersService;

	private resetPaginationSubscription: Subscription = new Subscription();

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

	/** Initial anime parameters. */
	public readonly initialAnimeParameters: AnimeParameters;

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

		this.initialAnimeParameters = this.animeParametersService.animeParameters;

		this.animeTypesFormControl = new FormControl<readonly string[]>(this.initialAnimeParameters.animeTypes);
		this.searchFormControl = new FormControl(this.initialAnimeParameters.search, { updateOn: 'blur' });

		this.paginatedAnime$ = this.animeParametersService.animeParameters$.pipe(
			switchMap(parameters => animeService.getAnimeList(parameters)),
		);
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.resetPaginationSubscription = merge(
			this.detectAnimeTypesParameterChange(),
			this.detectSearchParameterChange(),
		).pipe(
			tap(_ => _),
		)
			.subscribe();
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.resetPaginationSubscription.unsubscribe();
	}

	/**
	 * Handle pagination parameters change event.
	 * @param paginationEvent - Pagination event.
	 */
	public handlePaginationParametersChange(paginationEvent: PageEvent): void {
		const pageNumber: number = paginationEvent.pageIndex + 1;

		this.animeParametersService.appendPagination({
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

		this.animeParametersService.appendSorting({ sortingField, sortingDirection });
	}

	private detectSearchParameterChange(): Observable<string | null> {
		return this.searchFormControl.valueChanges.pipe(
			tap(search => this.animeParametersService.appendSearch(search)),
		);
	}

	private detectAnimeTypesParameterChange(): Observable<readonly string[]> {
		return this.animeTypesFormControl.valueChanges.pipe(
			map(animeTypes => (animeTypes ?? [])),
			tap(animeTypes => this.animeParametersService.appendFilters(animeTypes)),
		);
	}

	private resetPagination(): void {
		this.animeParametersService.appendPagination({
			pageSize: this.animeParametersService.animeParameters.pageSize,
			pageNumber: 1,
		});
	}
}
