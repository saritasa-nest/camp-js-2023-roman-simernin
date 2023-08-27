import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sort } from '@angular/material/sort';
import { SortingDirection, SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
import { FormControl, FormGroup } from '@angular/forms';
import { AnimeParametersService } from '@js-camp/angular/core/services/anime-parameters.service';
import { AnimeParameters } from '@js-camp/core/models/anime-parameters';

/** Anime table component. */
@Component({
	selector: 'anime-dashboard',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	providers: [AnimeParametersService],
})
export class AnimeDashboardComponent implements OnInit {

	private readonly animeFilters$: Observable<AnimeParameters>;

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
	protected readonly animeTypes: readonly string[] = ['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music', 'Unknown'];

	/** Observable for anime previews. */
	protected readonly paginatedAnime$: Observable<Pagination<Anime>>;

	public constructor(
		protected readonly animeParametersService: AnimeParametersService,
		animeService: AnimeService,
	) {
		const initialAnimeParameters = this.animeParametersService.animeParameters;

		this.initialSortingParameters = initialAnimeParameters;

		this.animeFiltersFormGroup = new FormGroup({
			search: new FormControl(initialAnimeParameters.search, { updateOn: 'blur' }),
			animeTypes: new FormControl<readonly string[]>(initialAnimeParameters.animeTypes),
		});

		this.animeFilters$ = this.animeFiltersFormGroup.valueChanges
			.pipe(
				takeUntilDestroyed(),
				map(({ search, animeTypes }) => this.animeParametersService.setFilters(search ?? '', animeTypes ?? [])),
			);

		this.paginatedAnime$ = this.animeParametersService.animeParameters$.pipe(
			switchMap(parameters => animeService.getAnimeList(parameters)),
		);
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeFilters$.subscribe();
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
}
