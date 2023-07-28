import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';

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

	/** Observable for anime previews. */
	public readonly animePreviews$: Observable<Anime[]>;

	public constructor(private readonly animeService: AnimeService) {
		this.animePreviews$ = animeService.getAnimeList();
	}
}
