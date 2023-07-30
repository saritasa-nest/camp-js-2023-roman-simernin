import { Component, OnInit } from '@angular/core';
import { Observable, share } from 'rxjs';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
})
export class AnimeDashboardComponent implements OnInit {

	/** Available page sizes for anime table. */
	public readonly availablePageSizes: number[] = [5, 10, 25];

	/**
	 * Default page size for anime table.
	 * Equal min from availables.
	 * */
	private readonly defaultPageSize: number = Math.min(...this.availablePageSizes);

	/** Current page size for anime table. */
	protected currentPageSize = this.defaultPageSize;

	/** Total anime count. */
	protected totalAnimeCount = 0;

	/** Displayed columns of anime table. */
	public readonly displayedAnimeTableColumns: readonly string[] = [
		'imageUrl',
		'englishTitle',
		'japaneseTitle',
		'type',
		'airedStartDate',
		'status',
	];

	/** Observable for anime previews. */
	public readonly paginatedAnime$: Observable<PaginationDto<Anime>>;

	public constructor(animeService: AnimeService) {
		this.paginatedAnime$ = animeService.getAnimeList(this.currentPageSize)
			.pipe(share());
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.setAnimeTotalCount();
	}

	private setAnimeTotalCount(): void {
		this.paginatedAnime$.subscribe(paginatedAnime => {
			this.totalAnimeCount = paginatedAnime.count;
		});
	}
}
