import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';

import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sort } from '@angular/material/sort';
import { SortingDirection, SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { FormControl, FormGroup } from '@angular/forms';
import { AnimeParametersService } from '@js-camp/angular/core/services/anime-parameters.service';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { EnumUtils } from '@js-camp/core/utils/enum.utils';

/** Anime table component. */
@Component({
	selector: 'anime-dashboard',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	providers: [AnimeParametersService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDashboardComponent implements OnInit {

	/** Displayed columns of anime table. */
	protected readonly displayedAnimeTableColumns: readonly string[] = [
		'imageUrl',
		'englishTitle',
		'japaneseTitle',
		'type',
		'airedStartDate',
		'status',
	];

	/** Initial anime sorting. */
	protected readonly initialSortingParameters: SortingParameters<AnimeSortingField>;

	/** Anime filters form group. */
	protected readonly animeFiltersFormGroup: FormGroup<{
		search: FormControl<string | null>;
		animeTypes: FormControl<readonly string[] | null>;
	}>;

	/** Anime types. */
	protected readonly animeTypes: readonly string[] = EnumUtils.toArray(AnimeType);

	/** Observable for anime previews. */
	protected readonly paginatedAnime$: Observable<Pagination<Anime>>;

	/** Paginator settings. */
	protected readonly paginatorSettings$: Observable<PaginationParameters>;

	public constructor(
		protected readonly animeParametersService: AnimeParametersService,
		private readonly destroyRef: DestroyRef,
		animeService: AnimeService,
	) {
		const initialAnimeParameters = this.animeParametersService.animeParameters;

		this.initialSortingParameters = initialAnimeParameters;

		this.animeFiltersFormGroup = new FormGroup({
			search: new FormControl(initialAnimeParameters.search, { updateOn: 'blur' }),
			animeTypes: new FormControl<readonly string[]>(initialAnimeParameters.animeTypes),
		});

		this.paginatedAnime$ = this.animeParametersService.animeParameters$.pipe(
			switchMap(parameters => animeService.getAnimeList(parameters)),
		);

		this.paginatorSettings$ = this.animeParametersService.animeParameters$;
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.subscribeToFiltersChanges();
	}

	/**
	 * Handle pagination parameters change event.
	 * @param paginationEvent - Pagination event.
	 */
	protected handlePaginationParametersChange(paginationEvent: PageEvent): void {
		const pageNumber: number = paginationEvent.pageIndex + 1;

		this.animeParametersService.setPagination({
			pageSize: paginationEvent.pageSize,
			pageNumber,
		});
	}

	/**
	 * Handle sorting change event.
	 * @param sortingEvent - Sorting event.
	 */
	protected handleSortingChange(sortingEvent: Sort): void {
		let sortingField: AnimeSortingField | null = null;
		let sortingDirection: SortingDirection | null = null;

		if (sortingEvent.direction !== '') {
			sortingField = sortingEvent.active as AnimeSortingField;
			sortingDirection = sortingEvent.direction as SortingDirection;
		}

		this.animeParametersService.setSorting({ sortingField, sortingDirection });
	}

	private subscribeToFiltersChanges(): void {
		this.animeFiltersFormGroup.valueChanges
			.pipe(
				tap(({ search, animeTypes }) => this.animeParametersService.setFilters(
					search ?? '',
					(animeTypes ?? []).map(animeTypeAsString => EnumUtils.fromString(animeTypeAsString, AnimeType)),
				)),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
