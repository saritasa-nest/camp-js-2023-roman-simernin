import { Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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

	private paginationParameters$ = new BehaviorSubject<PaginationParameters>(new PaginationParameters(this.defaultPageSize, 1));

	/** Observable for anime previews. */
	public readonly paginatedAnime$: Observable<Pagination<Anime>>;

	public constructor(animeService: AnimeService) {
		this.paginatedAnime$ = this.paginationParameters$
			.pipe(switchMap(paginationParameters => animeService.getAnimeList(paginationParameters)));
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
}
