import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { Observable, map, switchMap, tap } from 'rxjs';

/** Anime details component. */
@Component({
	selector: 'camp-anime-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
})
export class AnimeDetailsComponent {

	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	/** Anime details stream. */
	protected readonly animeDetails$: Observable<AnimeDetails | null>;

	public constructor() {
		this.animeDetails$ = this.activatedRoute.params.pipe(
			map(({ id }) => Number(id)),
			switchMap(id => this.animeService.getAnimeById(id)),
			tap(animeDetails => this.excludeAnimeNotFound(animeDetails)),
		);
	}

	private excludeAnimeNotFound(animeDetails: AnimeDetails | null): void {
		const isAnimeNotFound = animeDetails === null;

		if (isAnimeNotFound) {
			this.router.navigate(['not-found']);
		}
	}
}
