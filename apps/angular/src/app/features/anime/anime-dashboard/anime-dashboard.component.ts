import { Component, OnInit } from '@angular/core';
import { Observable, Subject, first, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { Pagination } from '@js-camp/core/models/pagination';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
})
export class AnimeDashboardComponent implements OnInit {

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

	/** Total anime count. */
	protected totalAnimeCount = 0;

	private paginationParameters$ = new Subject<PaginationParameters>();

	/** Observable for anime previews. */
	public readonly paginatedAnime$: Observable<Pagination<Anime>>;

	public constructor(animeService: AnimeService) {
		this.paginatedAnime$ = this.paginationParameters$
			.pipe(switchMap(paginationParameters => animeService.getAnimeList(paginationParameters)));
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.subscribeToGetAnimeTotalCount();
		this.setDefaultPaginationParameters();
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

	private subscribeToGetAnimeTotalCount(): void {
		/** Use pipe first to get anime total once because it is not depend pagination parameters. */
		this.paginatedAnime$
			.pipe(first())
			.subscribe(paginatedAnime => {
				this.totalAnimeCount = paginatedAnime.totalCount;
			});
	}

	private setDefaultPaginationParameters(): void {
		const defaultPageNumber = 1;

		this.paginationParameters$.next(new PaginationParameters(this.defaultPageSize, defaultPageNumber));
	}
}
